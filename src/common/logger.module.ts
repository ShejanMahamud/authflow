import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerService } from './logger.service';
import { LoggingInterceptor } from './logging.interceptor';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [CustomLoggerService, LoggingInterceptor],
  exports: [CustomLoggerService, LoggingInterceptor],
})
export class LoggerModule {}
