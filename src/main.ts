/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activează CORS pentru a permite conexiunile între frontend și backend
  app.enableCors({
    origin: 'http://localhost:3001', // URL-ul frontend-ului
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
