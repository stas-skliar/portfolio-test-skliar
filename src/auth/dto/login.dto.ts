import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address used for login',
    format: 'email',
    minLength: 5,
    maxLength: 150,
  })
  @IsEmail()
  @MinLength(5, { message: 'Email must be at least 5 characters' })
  @MaxLength(150, { message: 'Email must not exceed 150 characters' })
  email: string;

  @ApiProperty({
    example: 'secret123',
    description: 'User password (min 6, max 255 characters)',
    minLength: 6,
    maxLength: 255,
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(255, { message: 'Password must not exceed 255 characters' })
  password: string;
}
