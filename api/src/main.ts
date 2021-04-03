import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './core/exceptions/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    validationError: { target: false },
    exceptionFactory: (errors => new ValidationException(errors)),

  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.LISTEN_PORT || 3001);
}

bootstrap();
