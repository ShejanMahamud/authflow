import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AccountVerifyDto } from './dto/account-verify.dto';
import { ErrorResponseDto } from './dto/auth-error.dto';
import {
  GenericSuccessResponseDto,
  LoginResponseDto,
  RefreshTokenResponseDto,
  SocialLoginResponseDto,
} from './dto/auth-response.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RegisterUserDto } from './dto/create-user.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { GithubLoginDto } from './dto/github-login.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { LoginDto } from './dto/login-user.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import {
  UserDeleteResponseDto,
  UserResponseDto,
  UsersListResponseDto,
} from './dto/user-response.dto';
import { UserService } from './user.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('profilePicture'))
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 requests per minute
  @ApiOperation({
    summary: 'Register a new user account',
    description:
      'Creates a new user account with email verification. Optionally accepts a profile picture upload.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'User registration data with optional profile picture',
    type: RegisterUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered. Verification email sent.',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data or user already exists',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 413,
    description: 'Profile picture too large (max 2MB)',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 415,
    description:
      'Invalid profile picture format (only jpg, jpeg, png, gif allowed)',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many registration attempts. Please try again later.',
    type: ErrorResponseDto,
  })
  public async register(
    @Body() data: RegisterUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }), // 2MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    profilePicture: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.authService.registerUser(data, profilePicture, req);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests per minute
  @ApiOperation({
    summary: 'User login with email and password',
    description:
      'Authenticates a user with email and password. Returns JWT tokens on success.',
  })
  @ApiBody({
    description: 'User login credentials',
    type: LoginDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns access and refresh tokens.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid credentials or password not set for social login user',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found or email not verified',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many login attempts. Please try again later.',
    type: ErrorResponseDto,
  })
  public async login(@Body() data: LoginDto) {
    return this.authService.loginUser(data);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({
    summary: 'Initiate Google OAuth login',
    description: 'Redirects to Google OAuth consent screen for authentication.',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirect to Google OAuth consent screen',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many OAuth attempts',
    type: ErrorResponseDto,
  })
  public async googleAuth() {
    // This method initiates Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({
    summary: 'Google OAuth callback handler',
    description:
      'Handles the callback from Google OAuth and creates/logs in the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Google authentication successful',
    type: SocialLoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'User already registered with different provider or already logged in',
    type: SocialLoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Google authentication failed',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many OAuth attempts',
    type: ErrorResponseDto,
  })
  public async googleAuthCallback(@Req() req: Request) {
    return this.authService.googleLogin(req.user as GoogleLoginDto);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({
    summary: 'Initiate GitHub OAuth login',
    description: 'Redirects to GitHub OAuth consent screen for authentication.',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirect to GitHub OAuth consent screen',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many OAuth attempts',
    type: ErrorResponseDto,
  })
  public async githubAuth() {
    // This method initiates GitHub OAuth flow
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiOperation({
    summary: 'GitHub OAuth callback handler',
    description:
      'Handles the callback from GitHub OAuth and creates/logs in the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'GitHub authentication successful',
    type: SocialLoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'User already registered with different provider or already logged in',
    type: SocialLoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'GitHub authentication failed',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many OAuth attempts',
    type: ErrorResponseDto,
  })
  public async githubAuthCallback(@Req() req: Request) {
    return this.authService.githubLogin(req.user as GithubLoginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('refresh'))
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresh access token',
    description:
      'Uses a valid refresh token to generate new access and refresh tokens.',
  })
  @ApiBody({
    description: 'Refresh token data',
    type: RefreshTokenDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Tokens refreshed successfully',
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired refresh token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid JWT signature',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User or refresh token not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many refresh attempts',
    type: ErrorResponseDto,
  })
  public async generateNewTokens(@Body() data: RefreshTokenDto) {
    return this.authService.refreshToken(data);
  }

  @Post('validate-account')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({
    summary: 'Verify email address',
    description:
      "Validates the email verification token sent to user's email address.",
  })
  @ApiBody({
    description: 'Email verification data',
    type: AccountVerifyDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully',
    type: GenericSuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid verification token or token expired',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found or already verified',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many verification attempts',
    type: ErrorResponseDto,
  })
  public async validateAccount(@Body() data: AccountVerifyDto) {
    return this.authService.validateAccountVerifyEmail(data);
  }

  @Post('resend-verify/:email')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 3, ttl: 300000 } }) // 3 requests per 5 minutes
  @ApiOperation({
    summary: 'Resend email verification',
    description:
      'Resends the email verification link to the specified email address.',
  })
  @ApiParam({
    name: 'email',
    description: 'Email address to resend verification to',
    example: 'john.doe@example.com',
  })
  @ApiResponse({
    status: 200,
    description: 'Verification email sent successfully',
    type: GenericSuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid email or verification token still valid',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found or already verified',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description:
      'Too many resend attempts. Please wait before requesting again.',
    type: ErrorResponseDto,
  })
  public async resendAccountVerify(
    @Param('email') email: string,
    @Req() req: Request,
  ) {
    return this.authService.resendAccountVerification(email, req);
  }

  @Post('forget-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 3, ttl: 300000 } }) // 3 requests per 5 minutes
  @ApiOperation({
    summary: 'Request password reset',
    description: 'Sends a password reset email to the specified email address.',
  })
  @ApiBody({
    description: 'Email address for password reset',
    type: ForgetPasswordDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent successfully',
    type: GenericSuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Reset email already sent and still valid',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found with this email address',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description:
      'Too many password reset attempts. Please wait before requesting again.',
    type: ErrorResponseDto,
  })
  public async forgetPassword(
    @Body() data: ForgetPasswordDto,
    @Req() req: Request,
  ) {
    return this.authService.forgetPassword(data, req);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 300000 } }) // 5 requests per 5 minutes
  @ApiOperation({
    summary: 'Reset password with token',
    description:
      'Resets user password using the token received in the password reset email.',
  })
  @ApiBody({
    description: 'Password reset data',
    type: ResetPasswordDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
    type: GenericSuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid password format',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid reset token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Reset token expired',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many reset attempts',
    type: ErrorResponseDto,
  })
  public async resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  @Throttle({ default: { limit: 5, ttl: 300000 } }) // 5 requests per 5 minutes
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Change user password',
    description:
      'Changes the password for an authenticated user. Requires current password verification.',
  })
  @ApiBody({
    description: 'Password change data',
    type: ChangePasswordDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
    type: GenericSuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid current password, invalid new password format, or user has no password (social login)',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired access token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many password change attempts',
    type: ErrorResponseDto,
  })
  public async changePassword(@Body() data: ChangePasswordDto) {
    return this.authService.changePassword(data);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User logout',
    description:
      'Logs out the user by invalidating all tokens and clearing session data.',
  })
  @ApiBody({
    description: 'Logout data',
    type: LogoutDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
    type: GenericSuccessResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired access token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many logout attempts',
    type: ErrorResponseDto,
  })
  public async logOut(@Body() data: LogoutDto) {
    return this.authService.logOut(data);
  }

  // User Management Endpoints

  @Get('users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  @Throttle({ default: { limit: 30, ttl: 60000 } }) // 30 requests per minute
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users with pagination',
    description:
      'Retrieves a paginated list of all users in the system. Supports cursor-based pagination for efficient browsing through large datasets.',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Maximum number of users to return (1-100)',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'cursor',
    description: 'Cursor for pagination (user ID to start from)',
    required: false,
    type: String,
    example: 'clm1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: UsersListResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid query parameters',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired access token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
    type: ErrorResponseDto,
  })
  public async getAllUsers(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('cursor') cursor: string,
  ) {
    return this.userService.allUsers(limit, cursor);
  }

  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  @Throttle({ default: { limit: 50, ttl: 60000 } }) // 50 requests per minute
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a specific user by ID',
    description:
      'Retrieves detailed information about a specific user using their unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user',
    example: 'clm1234567890abcdef',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user ID format',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired access token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
    type: ErrorResponseDto,
  })
  public async getUser(@Param('id') id: string) {
    return this.userService.getAUser(id);
  }

  @Delete('users/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  @Throttle({ default: { limit: 10, ttl: 300000 } }) // 10 requests per 5 minutes
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a specific user',
    description:
      'Permanently deletes a user account and all associated data. This action cannot be undone.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user to delete',
    example: 'clm1234567890abcdef',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: UserDeleteResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user ID format',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired access token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - insufficient permissions to delete user',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Too many deletion attempts',
    type: ErrorResponseDto,
  })
  public async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
