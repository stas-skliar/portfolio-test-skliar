import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'Valid email address used as a unique identifier for the user',
    format: 'email',
    minLength: 5,
    maxLength: 150,
  })
  @IsEmail()
  @MinLength(5, { message: 'Email must be at least 5 characters long' })
  @MaxLength(150, { message: 'Email must not exceed 150 characters' })
  email: string;

  @ApiProperty({
    example: 'secret123',
    description: 'Password for the account (minimum 6 characters)',
    minLength: 6,
    maxLength: 255,
  })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(255, { message: 'Password must not exceed 255 characters' })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;
}
