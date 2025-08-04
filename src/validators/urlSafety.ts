import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { ValidatorConstraintInterface } from 'class-validator';

export class UrlSafety implements ValidatorConstraintInterface {
  validate(url: string): Promise<boolean> | boolean {
    try {
      const { hostname, protocol } = new URL(url);
      const allowedDomains = [
        'lh3.googleusercontent.com',
        'avatars.githubusercontent.com',
      ];
      return protocol === 'https:' && allowedDomains.includes(hostname);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException('Image is not from allowed domains');
      } else {
        throw new BadGatewayException('Something went wrong');
      }
    }
  }
}
