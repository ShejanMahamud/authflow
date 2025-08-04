import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class GithubLoginDto {
  @ApiProperty({
    description: 'Email address from GitHub OAuth profile',
    example: 'john.doe@users.noreply.github.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Display name from GitHub OAuth profile',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'Generated username from GitHub OAuth profile',
    example: 'johndoe_1234',
  })
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty({
    description: 'Profile picture URL from GitHub OAuth profile',
    example: 'https://avatars.githubusercontent.com/u/123456?v=4',
    format: 'url',
  })
  @IsString()
  @IsNotEmpty({ message: 'Profile picture is required' })
  @IsUrl({}, { message: 'Profile picture must be a valid URL' })
  profilePicture: string;
}
