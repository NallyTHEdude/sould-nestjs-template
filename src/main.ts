import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import config from '@/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT);
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
