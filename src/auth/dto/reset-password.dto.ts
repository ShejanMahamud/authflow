import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'User ID from the reset password email link',
    example: 'clm1234567890abcdef',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  readonly uid: string;

  @ApiProperty({
    description: 'Password reset token from the email link',
    example: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    minLength: 32,
  })
  @IsString()
  @IsNotEmpty({ message: 'Reset token is required' })
  readonly token: string;

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
