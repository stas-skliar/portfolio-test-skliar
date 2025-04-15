import { ApiProperty } from '@nestjs/swagger';

export class PaginatedMetaDto {
  @ApiProperty({ example: 50 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ type: () => PaginatedMetaDto })
  meta: PaginatedMetaDto;

  @ApiProperty({ isArray: true })
  data: T[];
}
