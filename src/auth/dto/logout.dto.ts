import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    description: 'User ID to logout',
    example: 'clm1234567890abcdef',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  id: string;
}
