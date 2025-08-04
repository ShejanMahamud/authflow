import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User ID',
    example: 'clm1234567890abcdef',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  readonly uid: string;

  @ApiProperty({
    description: 'Current password',
    example: 'OldPassword123!',
    minLength: 8,
    format: 'password',
  })
  @IsString()
  @IsNotEmpty({ message: 'Current password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  readonly oldPassword: string;

  @ApiProperty({
    description:
      'New password (must be at least 8 characters with uppercase, lowercase, number, and special character)',
    example: 'NewSecurePassword123!',
    minLength: 8,
    format: 'password',
  })
  @IsString()
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  readonly newPassword: string;
}
