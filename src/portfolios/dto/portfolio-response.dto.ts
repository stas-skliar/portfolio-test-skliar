import { ApiProperty } from '@nestjs/swagger';
import { ImageResponseDto } from "../../images/dto/image-response.dto";

export class PortfolioResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'UI Designs' })
  name: string;

  @ApiProperty({ example: 'A collection of my user interface work' })
  description: string;

  @ApiProperty({ example: 2 })
  userId: number;

  @ApiProperty({ example: '2024-04-15T13:00:00Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-04-15T13:00:00Z' })
  updatedAt: string;

  @ApiProperty({ type: [ImageResponseDto] })
  images: ImageResponseDto[];
}
