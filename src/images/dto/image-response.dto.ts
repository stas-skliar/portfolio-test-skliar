import { ApiProperty } from '@nestjs/swagger';

export class ImageResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Landing page' })
  name: string;

  @ApiProperty({ example: 'Dark mode screenshot' })
  description: string;

  @ApiProperty({ example: 'https://bucket.s3.amazonaws.com/img.jpg' })
  imagePath: string;

  @ApiProperty({ example: 2 })
  portfolioId: number;

  @ApiProperty({ example: '2024-04-15T12:34:56Z' })
  createdAt: string;
}
