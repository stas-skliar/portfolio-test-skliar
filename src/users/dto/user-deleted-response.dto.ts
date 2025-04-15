import { ApiProperty } from '@nestjs/swagger';

export class UserDeletedResponseDto {
  @ApiProperty({ example: 'User deleted successfully' })
  message: string;
}
