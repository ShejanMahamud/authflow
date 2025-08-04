# Authentication Service Documentation

## Overview

The Authentication Service provides comprehensive user authentication and authorization functionality with full Swagger/OpenAPI documentation. It supports multiple authentication methods, secure token management, and robust security features.

## Features

### ✅ Authentication Methods

- **Email/Password Authentication**: Traditional login with email verification
- **Google OAuth**: Social login with Google accounts
- **GitHub OAuth**: Social login with GitHub accounts

### ✅ Security Features

- **JWT Tokens**: Secure access and refresh token implementation
- **Password Security**: Argon2 hashing with strong password requirements
- **Rate Limiting**: Comprehensive throttling on all endpoints
- **Email Verification**: Required email verification for new accounts
- **Token Expiration**: Configurable token lifetimes with refresh capability

### ✅ User Management

- **Registration**: User account creation with profile picture upload
- **Password Management**: Change and reset password functionality
- **Account Verification**: Email-based account verification system
- **Logout**: Secure token invalidation

## API Documentation

### Swagger/OpenAPI Integration

All endpoints are fully documented with comprehensive Swagger specifications including:

- **Detailed Descriptions**: Clear explanations of each endpoint's purpose
- **Request/Response Schemas**: Complete data models with examples
- **Error Responses**: Detailed error codes and messages
- **Authentication Requirements**: Bearer token specifications
- **Rate Limiting Information**: Throttling limits and time windows
- **Validation Rules**: Input validation requirements and formats

### Endpoints Overview

| Endpoint                     | Method | Description                 | Rate Limit |
| ---------------------------- | ------ | --------------------------- | ---------- |
| `/auth/register`             | POST   | Register new user account   | 5/min      |
| `/auth/login`                | POST   | User login with credentials | 10/min     |
| `/auth/google`               | GET    | Initiate Google OAuth       | 20/min     |
| `/auth/google/callback`      | GET    | Google OAuth callback       | 20/min     |
| `/auth/github`               | GET    | Initiate GitHub OAuth       | 20/min     |
| `/auth/github/callback`      | GET    | GitHub OAuth callback       | 20/min     |
| `/auth/refresh`              | POST   | Refresh access token        | 20/min     |
| `/auth/validate-account`     | POST   | Verify email address        | 10/min     |
| `/auth/resend-verify/:email` | POST   | Resend verification email   | 3/5min     |
| `/auth/forget-password`      | POST   | Request password reset      | 3/5min     |
| `/auth/reset-password`       | POST   | Reset password with token   | 5/5min     |
| `/auth/change-password`      | POST   | Change user password        | 5/5min     |
| `/auth/logout`               | POST   | User logout                 | 10/min     |

### Response Types

#### Success Responses

- **LoginResponseDto**: Login success with tokens
- **SocialLoginResponseDto**: OAuth login responses
- **RefreshTokenResponseDto**: Token refresh responses
- **GenericSuccessResponseDto**: General success operations
- **RegisterResponseDto**: Registration success

#### Error Responses

- **ErrorResponseDto**: Comprehensive error information with codes and messages

### Data Transfer Objects (DTOs)

All DTOs include comprehensive validation and Swagger documentation:

#### Request DTOs

- **RegisterUserDto**: User registration data
- **LoginDto**: Login credentials
- **ChangePasswordDto**: Password change data
- **ResetPasswordDto**: Password reset data
- **AccountVerifyDto**: Email verification data
- **ForgetPasswordDto**: Password reset request
- **RefreshTokenDto**: Token refresh data
- **LogoutDto**: Logout data
- **GoogleLoginDto**: Google OAuth data
- **GithubLoginDto**: GitHub OAuth data

#### Response DTOs

- **AuthTokensDto**: JWT token pair
- **LoginResponseDto**: Login success response
- **SocialLoginResponseDto**: OAuth response with conditional tokens
- **RefreshTokenResponseDto**: Token refresh response
- **GenericSuccessResponseDto**: Generic success response

## Security Implementation

### Password Security

- **Argon2 Hashing**: Industry-standard password hashing
- **Strong Password Requirements**: Minimum 8 characters with complexity rules
- **Password Validation**: Uppercase, lowercase, number, and special character requirements

### Token Security

- **JWT Implementation**: Secure JSON Web Tokens
- **Separate Secrets**: Different secrets for access and refresh tokens
- **Token Rotation**: New tokens generated on refresh
- **Database Storage**: Hashed refresh tokens stored securely
- **Expiration Management**: Configurable token lifetimes

### Rate Limiting

- **Endpoint-Specific Limits**: Tailored throttling for different operations
- **Progressive Restrictions**: Stricter limits for sensitive operations
- **Time-Window Based**: TTL-based rate limiting

### Input Validation

- **Class Validator**: Comprehensive input validation
- **Custom Messages**: User-friendly validation error messages
- **Type Safety**: TypeScript interfaces for all data structures

## Usage Examples

### Registration

```typescript
POST /auth/register
Content-Type: multipart/form-data

{
  "username": "johndoe123",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "provider": "email"
}
```

### Login

```typescript
POST /auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

### Token Refresh

```typescript
POST /auth/refresh
Authorization: Bearer <refresh_token>
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "clm1234567890abcdef"
}
```

## Configuration

### Environment Variables

- `ACCESS_TOKEN_SECRET`: Secret for access token signing
- `REFRESH_TOKEN_SECRET`: Secret for refresh token signing
- `ACCESS_TOKEN_EXPIRES`: Access token expiration time
- `REFRESH_TOKEN_EXPIRES`: Refresh token expiration time
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GOOGLE_CALLBACK_URL`: Google OAuth callback URL
- `GITHUB_CLIENT_ID`: GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth client secret
- `GITHUB_CALLBACK_URL`: GitHub OAuth callback URL

## Error Handling

Comprehensive error handling with detailed error responses:

- **400 Bad Request**: Invalid input data or business logic errors
- **401 Unauthorized**: Authentication failures
- **403 Forbidden**: Authorization failures or expired tokens
- **404 Not Found**: Resource not found errors
- **409 Conflict**: Duplicate resource errors
- **413 Payload Too Large**: File upload size exceeded
- **415 Unsupported Media Type**: Invalid file formats
- **429 Too Many Requests**: Rate limit exceeded

Each error includes:

- HTTP status code
- Error message
- Detailed description
- Suggested resolution (where applicable)

## Integration

The authentication service integrates with:

- **Mail Service**: For verification and reset emails
- **Upload Service**: For profile picture handling
- **Prisma ORM**: For database operations
- **Passport.js**: For OAuth strategies
- **JWT Service**: For token management

## Testing

All endpoints can be tested using the integrated Swagger UI available at `/api-docs` when the application is running in development mode.
