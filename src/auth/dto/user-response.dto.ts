import { ApiProperty } from '@nestjs/swagger';
import { Provider, UserRole } from 'generated/prisma';

export class UserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 'clm1234567890abcdef',
  })
  id: string;

  @ApiProperty({
    description: 'Unique username',
    example: 'johndoe123',
  })
  username: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'URL to user profile picture',
    example: 'https://example.com/profile-pictures/johndoe.jpg',
  })
  profilePicture: string;

  @ApiProperty({
    description: 'User role in the system',
    enum: UserRole,
    example: UserRole.user,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Authentication provider used for registration',
    enum: Provider,
    example: Provider.email,
  })
  provider: Provider;

  @ApiProperty({
    description: 'Whether the user account is deleted',
    example: false,
  })
  isDeleted: boolean;

  @ApiProperty({
    description: 'Whether the user email is verified',
    example: true,
  })
  emailVerified: boolean;

  @ApiProperty({
    description: 'Account creation timestamp',
    example: '2024-01-15T10:30:45.123Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last account update timestamp',
    example: '2024-01-15T10:30:45.123Z',
  })
  updatedAt: Date;
}

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Number of users requested',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Number of users returned in current response',
    example: 10,
  })
  count: number;

  @ApiProperty({
    description: 'Whether there are more users available',
    example: true,
  })
  hasNextPage: boolean;

  @ApiProperty({
    description: 'Cursor for the next page of results',
    example: 'clm1234567890abcdef',
    nullable: true,
  })
  nextCursor: string | null;
}

export class UsersListResponseDto {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Human-readable message about the operation result',
    example: 'All users fetched successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Array of user objects',
    type: [UserDto],
  })
  data: UserDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
    required: false,
  })
  meta?: PaginationMetaDto;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Human-readable message about the operation result',
    example: 'User fetched successfully!',
  })
  message: string;

  @ApiProperty({
    description: 'User object',
    type: UserDto,
  })
  data: UserDto;
}

export class UserDeleteResponseDto {
  @ApiProperty({
    description: 'Indicates if the deletion was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Human-readable message about the deletion result',
    example: 'clm1234567890abcdef is deleted successfully!',
  })
  message: string;
}
