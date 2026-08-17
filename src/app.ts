import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import config from './config';

export const appMiddleware = (app: INestApplication) => {
  app.use(helmet());

  if (config.USE_CORS) {
    app.enableCors({
      origin: config.CORS_ORIGIN,
      credentials: config.USE_COOKIES,
    });
  }
};
