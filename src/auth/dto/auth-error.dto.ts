import { ApiProperty } from '@nestjs/swagger';

export class ErrorFieldDto {
  @ApiProperty({
    description:
      'The field name that caused the error, null for general errors',
    example: 'email',
    nullable: true,
    type: 'string',
  })
  field: string | null;

  @ApiProperty({
    description: 'Detailed error message for the field',
    example: 'email must be a valid email address',
  })
  message: string;
}

/**
 * Metadata information about the error response
 */
export class ErrorMetaDto {
  @ApiProperty({
    description: 'HTTP status code of the error',
    example: 400,
    type: 'number',
  })
  statusCode: number;

  @ApiProperty({
    description: 'ISO timestamp when the error occurred',
    example: '2024-01-15T10:30:45.123Z',
    type: 'string',
    format: 'date-time',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path where the error occurred',
    example: '/api/auth/login',
    type: 'string',
  })
  path: string;
}

/**
 * Standard error response structure
 */
export class ErrorResponseDto {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: false,
    type: 'boolean',
    default: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Main error message describing what went wrong',
    example: 'Validation failed',
    type: 'string',
  })
  message: string;

  @ApiProperty({
    description:
      'Array of detailed field-specific errors (present for validation errors)',
    type: [ErrorFieldDto],
    required: false,
    nullable: true,
    example: [
      {
        field: 'email',
        message: 'email must be a valid email address',
      },
      {
        field: 'password',
        message: 'password must be at least 8 characters long',
      },
    ],
  })
  errors?: ErrorFieldDto[];

  @ApiProperty({
    description: 'Metadata about the error response',
    type: ErrorMetaDto,
    example: {
      statusCode: 400,
      timestamp: '2024-01-15T10:30:45.123Z',
      path: '/api/auth/login',
    },
  })
  meta: ErrorMetaDto;
}
