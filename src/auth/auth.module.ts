import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { UploadModule } from 'src/upload/upload.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UserService } from './user.service';

/**
 * Authentication Module
 *
 * Provides comprehensive authentication functionality including:
 * - Email/password registration and login
 * - Google OAuth integration
 * - GitHub OAuth integration
 * - JWT access and refresh token management
 * - Email verification
 * - Password reset functionality
 * - User management endpoints
 * - Rate limiting and security features
 *
 * All endpoints are fully documented with Swagger/OpenAPI specifications
 * including detailed request/response schemas, examples, and error codes.
 */
@Module({
  imports: [UploadModule, JwtModule.register({}), MailModule],
  providers: [
    AuthService,
    UserService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    GoogleStrategy,
    GithubStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
