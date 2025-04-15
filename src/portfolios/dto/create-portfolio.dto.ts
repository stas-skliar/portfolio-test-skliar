import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({
    example: 'My Projects',
    description: 'The name of the portfolio',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @ApiProperty({
    example: 'A collection of freelance projects.',
    description: 'Short description of the portfolio',
    minLength: 10,
    maxLength: 300,
  })
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  @MaxLength(300, { message: 'Description must not exceed 300 characters' })
  description: string;
}
