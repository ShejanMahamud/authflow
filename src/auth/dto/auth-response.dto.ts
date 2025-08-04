import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDto {
  @ApiProperty({
    description: 'JWT access token for API authentication',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    format: 'jwt',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token for obtaining new access tokens',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.rTCH8Q2iys_2KqVrYhRGkq2KYdG2oUlmfHqR1UHwzUw',
    format: 'jwt',
  })
  refreshToken: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'Indicates if the login was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Human-readable message about the login result',
    example: 'Logged in successfully!',
  })
  message: string;

  @ApiProperty({
    description: 'Authentication tokens',
    type: AuthTokensDto,
  })
  data: AuthTokensDto;
}

export class SocialLoginResponseDto {
  @ApiProperty({
    description: 'Indicates if the social login was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Human-readable message about the social login result',
    examples: {
      success: {
        value: 'Google login successful',
        description: 'Successful Google OAuth login',
      },
      existing_user: {
        value: 'User already registered with email',
        description: 'User exists with different provider',
      },
      already_logged_in: {
        value: 'User already logged in via google',
        description: 'User has active session',
      },
    },
  })
  message: string;

  @ApiProperty({
    description: 'Authentication tokens (only present on successful login)',
    type: AuthTokensDto,
    required: false,
  })
  data?: AuthTokensDto;
}

export class RefreshTokenResponseDto {
  @ApiProperty({
    description: 'Indicates if the token refresh was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Human-readable message about the refresh result',
    example: 'New tokens revoked!',
  })
  message: string;

  @ApiProperty({
    description: 'New authentication tokens',
    type: AuthTokensDto,
  })
  data: AuthTokensDto;
}

export class GenericSuccessResponseDto {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Human-readable message about the operation result',
    examples: {
      account_verified: {
        value: 'Account email verified',
        description: 'Email verification successful',
      },
      password_reset_sent: {
        value: 'Password reset email sent',
        description: 'Password reset email sent successfully',
      },
      password_changed: {
        value: 'Password changed successfully',
        description: 'Password change successful',
      },
      password_reset: {
        value: 'Password successfully reset',
        description: 'Password reset successful',
      },
      logout: {
        value: 'User logged out successfully!',
        description: 'Logout successful',
      },
      verification_sent: {
        value: 'Verification email sent!',
        description: 'Verification email resent successfully',
      },
    },
  })
  message: string;
}
