import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Great work!',
    minLength: 1,
    maxLength: 300,
  })
  @IsString()
  @MinLength(1, { message: 'Comment must not be empty' })
  @MaxLength(300, { message: 'Comment must not exceed 500 characters' })
  text: string;
}
