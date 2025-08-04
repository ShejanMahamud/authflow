import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Provider } from 'generated/prisma';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'johndoe',
    default: 'johndoe123',
  })
  readonly username: string;

  @ApiProperty({
    example: 'John Doe',
    default: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'johndoe123@gmail.com',
    default: 'johndoe123@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'password123',
    default: 'Password123@',
  })
  @ValidateIf((o: RegisterUserDto) => o.provider === 'email')
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password minimum 8 characters long',
  })
  readonly password: string;

  provider: Provider;
}
