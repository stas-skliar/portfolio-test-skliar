import { Controller, Delete, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { UsersService } from './users.service';
import { UserDeletedResponseDto } from './dto/user-deleted-response.dto';
import { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete('me')
  @ApiOperation({
    summary: 'Delete the authenticated user and all associated data',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: UserDeletedResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - missing or invalid token',
  })
  deleteSelf(@CurrentUser() user: AuthUser) {
    return this.usersService.deleteUser(user.id);
  }
}
