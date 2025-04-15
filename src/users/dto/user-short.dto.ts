import { ApiProperty } from '@nestjs/swagger';

export class UserShortDto {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 'Stanislav Skliar' })
  name: string;

  @ApiProperty({ example: 'stanislav@example.com' })
  email: string;
}
