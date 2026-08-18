import { Injectable } from '@nestjs/common';
import { logger } from './logger.config';

@Injectable()
export class LoggerService {
  info(message: string, context?: string, trace?: string): void {
    logger.info(message, { context, trace });
  }

  error(message: string, context?: string, trace?: string): void {
    logger.error(message, { context, trace });
  }

  warn(message: string, context?: string, trace?: string): void {
    logger.warn(message, { context, trace });
  }

  debug(message: string, context?: string, trace?: string): void {
    logger.debug(message, { context, trace });
  }

  verbose(message: string, context?: string, trace?: string): void {
    logger.verbose(message, { context, trace });
  }
}
