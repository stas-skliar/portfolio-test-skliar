import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  InternalServerErrorException, Query
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiParam, ApiQuery, getSchemaPath, ApiOkResponse
} from "@nestjs/swagger";
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { ImagesService } from './images.service';
import { AwsService } from '../aws/aws.service';
import { CreateImageDto } from './dto/create-image.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { ImageResponseDto } from './dto/image-response.dto';
import { CommentResponseDto } from '../comments/dto/comment-response.dto';
import { AuthUser } from '../auth/types/auth-user.type';
import { getS3KeyFromUrl } from '../utils/get-s3-key.util';
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { PaginatedResponseDto } from "../common/dto/paginated-response.dto";

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly awsService: AwsService,
  ) {}

  @Get('/feed')
  @ApiOperation({ summary: 'Get paginated feed of public images' })
  @ApiOkResponse({
    description: 'Paginated images with metadata',
    schema: {
      type: 'object',
      properties: {
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 100 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
          },
        },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(ImageResponseDto) },
        },
      },
    },
  })
  getFeed(@Query() query: PaginationQueryDto) {
    return this.imagesService.getPublicFeed(query);
  }

  @Post('/upload/:portfolioId')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload an image to a specific portfolio' })
  @ApiParam({
    name: 'portfolioId',
    example: 1,
    description: 'ID of the portfolio',
  })
  @ApiBody({
    description: 'Form data with image file and metadata',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
          example: 'Landing page screenshot',
        },
        description: {
          type: 'string',
          example: 'A dark-themed landing page for SaaS product',
        },
      },
      required: ['file', 'name', 'description'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    type: ImageResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Not owner of portfolio',
  })
  async uploadImage(
    @Param('portfolioId') portfolioId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateImageDto,
    @CurrentUser() user: AuthUser,
  ) {
    let imageUrl: string;

    try {
      imageUrl = await this.awsService.uploadImage(file);
    } catch (err) {
      console.error('[S3 UPLOAD ERROR]', err.message);
      throw new InternalServerErrorException(
        'Failed to upload image to storage',
      );
    }

    try {
      return await this.imagesService.addToPortfolio(
        {
          ...body,
          imagePath: imageUrl,
        },
        +portfolioId,
        user.id,
      );
    } catch (err) {
      const key = getS3KeyFromUrl(imageUrl);

      // TODO: add additional logic
      await this.awsService
        .deleteImage(key)
        .catch((e) => console.error('[AWS CLEANUP ERROR]', e.message));

      throw err;
    }
  }

  @Delete('/:id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete your own image by ID' })
  @ApiParam({ name: 'id', example: 5 })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not your image' })
  deleteImage(@Param('id') id: number, @CurrentUser() user: AuthUser) {
    return this.imagesService.deleteOwnImage(+id, user.id);
  }

  @Get('/:id/comments')
  @ApiOperation({ summary: 'Get comments for a specific image' })
  @ApiParam({ name: 'id', example: 7 })
  @ApiResponse({
    status: 200,
    description: 'List of comments',
    type: [CommentResponseDto],
  })
  getComments(@Param('id') id: number) {
    return this.imagesService.getImageComments(+id);
  }

  @Post('/:id/comments')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a comment to an image' })
  @ApiParam({ name: 'id', example: 7 })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: 'Comment added successfully',
    type: CommentResponseDto,
  })
  addComment(
    @Param('id') id: number,
    @Body() body: CreateCommentDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.imagesService.addCommentToImage(+id, body.text, user.id);
  }
}
