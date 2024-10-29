import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      process.env.FRONTEND_LOCAL_URL,
      process.env.FRONTEND_DEPLOY_URL
    ],
    methods: [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS' 
    ],
    allowedHeaders: [
      'Content-Type', 
      'Authorization',
    ],
    credentials: true, 
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
