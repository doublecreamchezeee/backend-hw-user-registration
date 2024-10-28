import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      "http://localhost:4000", // Local development
      "https://frontend-hw-user-registration.vercel.app" // Production frontend
    ],
    methods: [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS' // Include OPTIONS method if needed for preflight requests
    ],
    allowedHeaders: [
      'Content-Type', // Add any other headers you want to allow
      'Authorization', // If you need to send an authorization token
    ],
    credentials: true, // If you need to send cookies with requests
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
