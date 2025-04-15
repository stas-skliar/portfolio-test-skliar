import { ApiProperty } from '@nestjs/swagger';
import { UserShortDto } from '../../users/dto/user-short.dto';

export class CommentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Nice work!' })
  text: string;

  @ApiProperty({ example: 2 })
  imageId: number;

  @ApiProperty({ example: '2025-04-15T15:00:00Z' })
  createdAt: string;

  @ApiProperty({ type: UserShortDto })
  user: UserShortDto;
}
