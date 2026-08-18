import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import config from '@/config';
import helmet from 'helmet';

// constants for configurable options
// provides automatic validation and transformation of incoming requests based on DTOs
const VALIDATION_PIPE_OPTIONS = {
  whitelist: true, // Automatically strip unannotated properties
  forbidNonWhitelisted: true, // Throw an error if unauthorized properties are sent
  transform: true, // Automatically transform payloads to match DTO object types
};

const CORS_OPTIONS = {
  origin: config.CORS_ORIGIN,
  credentials: config.USE_COOKIES,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Global API prefix
  const globalPrefix = '/api';
  app.setGlobalPrefix(globalPrefix);

  // Security middleware
  app.use(helmet());

  //TODO: uncomment after project completion
  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
  if (config.USE_CORS) {
    app.enableCors(CORS_OPTIONS);
  }

  // Listen on the specified port
  await app.listen(config.PORT);
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
