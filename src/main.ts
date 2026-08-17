import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import config from '@/config';
import { appMiddleware } from '@/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appMiddleware(app);
  await app.listen(config.PORT);
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
