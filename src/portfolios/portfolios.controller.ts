import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { PortfolioResponseDto } from './dto/portfolio-response.dto';
import { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Portfolios')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new portfolio' })
  @ApiBody({ type: CreatePortfolioDto })
  @ApiResponse({
    status: 201,
    description: 'Portfolio created successfully',
    type: PortfolioResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  create(@Body() dto: CreatePortfolioDto, @CurrentUser() user: AuthUser) {
    return this.portfoliosService.create(dto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all portfolios for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'List of portfolios',
    type: [PortfolioResponseDto],
  })
  getAll(@CurrentUser() user: AuthUser) {
    return this.portfoliosService.findAllForUser(user.id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a user-owned portfolio by ID' })
  @ApiParam({ name: 'id', example: 3, description: 'Portfolio ID to delete' })
  @ApiResponse({ status: 200, description: 'Portfolio deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your portfolio' })
  delete(@Param('id') id: number, @CurrentUser() user: AuthUser) {
    return this.portfoliosService.deleteOwn(+id, user.id);
  }
}
