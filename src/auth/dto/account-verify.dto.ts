import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccountVerifyDto {
  @ApiProperty({
    description: 'Email verification token from the verification email link',
    example: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    minLength: 32,
  })
  @IsString()
  @IsNotEmpty({ message: 'Verification token is required' })
  readonly verifyToken: string;

  @ApiProperty({
    description: 'User ID from the verification email link',
    example: 'clm1234567890abcdef',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  readonly uid: string;
}
