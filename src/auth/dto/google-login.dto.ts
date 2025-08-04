import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  Validate,
} from 'class-validator';
import { UrlSafety } from 'src/validators/urlSafety';

export class GoogleLoginDto {
  @ApiProperty({
    description: 'Email address from Google OAuth profile',
    example: 'john.doe@gmail.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Full name from Google OAuth profile',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'Generated username from Google OAuth profile',
    example: 'john_doe_1234',
  })
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty({
    description: 'Profile picture URL from Google OAuth profile',
    example: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
    format: 'url',
  })
  @IsString()
  @IsNotEmpty({ message: 'Profile picture is required' })
  @IsUrl(
    { protocols: ['https'] },
    { message: 'Profile picture must be a valid URL' },
  )
  @Validate(UrlSafety)
  profilePicture: string;
}
