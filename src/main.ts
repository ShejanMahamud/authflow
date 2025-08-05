import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/logging.interceptor';
import { ResponseException } from './common/response.exception';
import { ResponseInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  //cors config
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL?.split(',')
        : ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  //helmet
  app.use(helmet());
  //must required env vars
  const requiredEnvVars = [
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET',
    'DATABASE_URL',
    'CLIENT_URL',
  ];
  //if not found throw error
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
  // Add logging interceptor first, then response interceptor
  const loggingInterceptor = app.get(LoggingInterceptor);
  app.useGlobalInterceptors(loggingInterceptor, new ResponseInterceptor());

  app.useGlobalFilters(new ResponseException());
  const config = new DocumentBuilder()
    .setTitle('AuthFlow')
    .setDescription(
      'A secure authentication system designed for production environments, built with scalability and performance in mind',
    )
    .setVersion('1.0.0')
    .setLicense(
      'Apache 2.0 License',
      'https://www.apache.org/licenses/LICENSE-2.0',
    )
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api/docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
