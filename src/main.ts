import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import config from '@/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Global API prefix
  const globalPrefix = '/api';
  app.setGlobalPrefix(globalPrefix);

  // Security middleware
  app.use(helmet());
  if (config.USE_CORS) {
    app.enableCors({
      origin: config.CORS_ORIGIN,
      credentials: config.USE_COOKIES,
    });
  }

  // Listen on the specified port
  await app.listen(config.PORT);
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
