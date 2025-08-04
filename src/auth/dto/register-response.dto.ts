import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({
    example: true,
    description: 'Response status',
  })
  success: boolean;

  @ApiProperty({
    example: 'Registration Successful',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    example: {
      ip: '0.0.0.0',
      statusCode: 201,
      responseTime: '12ms',
      timestamp: 1754273896331,
      path: '/auth/register',
    },
    description: 'Response Meta Description',
  })
  meta: {
    ip: string;
    statusCode: string;
    responseTime: string;
    timestamp: Date;
    path: string;
  };
}
