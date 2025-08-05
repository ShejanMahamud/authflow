import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsJWT } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'JWT refresh token received during login',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    format: 'jwt',
  })
  @IsString()
  @IsNotEmpty({ message: 'Refresh token is required' })
  @IsJWT({ message: 'Invalid JWT token format' })
  readonly token: string;

  @ApiProperty({
    description: 'User ID associated with the refresh token',
    example: 'clm1234567890abcdef',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  readonly id: string;
}
