// logger.config.ts
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '@/config/index';
import type { TransformableInfo } from 'logform';
interface LogInfo extends TransformableInfo {
  timestamp?: string;
  stack?: string;
  context?: string;
  [key: string]: unknown;
}

const isDevEnv = config.NODE_ENV === 'development'; // can only be development or production

const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { level, message, timestamp, stack, context, ...meta } =
      info as LogInfo;

    const cleanMeta = Object.fromEntries(
      Object.entries(meta).filter(([, v]) => v !== undefined),
    );
    const metaString = Object.keys(cleanMeta).length
      ? JSON.stringify(cleanMeta, null, 2)
      : '';

    const ctx = typeof context === 'string' ? context : 'App';
    const msg = typeof message === 'string' ? message : JSON.stringify(message);
    const errStack = typeof stack === 'string' ? stack : undefined;

    return `${String(timestamp)} [${ctx}] [${level}]: ${errStack ?? msg} ${metaString}`;
  }),
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

export const logger = winston.createLogger({
  level: 'info',
  format: isDevEnv ? devFormat : prodFormat,
  transports: [
    isDevEnv
      ? new winston.transports.Console()
      : new DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
  ],
});
