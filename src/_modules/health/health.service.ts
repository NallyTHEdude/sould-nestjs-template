import { DatabaseService } from '@/database/database.service';
import { LoggerService } from '@/logger/logger.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HealthCheckResponseDto } from './dto/healthCheck.dto';

@Injectable()
export class HealthService {
  constructor(
    private readonly logger: LoggerService,
    private readonly databaseService: DatabaseService,
  ) {}

  async checkHealth(): Promise<HealthCheckResponseDto> {
    try {
      await this.databaseService.$queryRaw`SELECT 1`;
      return {
        status: 'OK',
        timestamp: new Date().toISOString(),
        message: 'All systems are operational',
      };
    } catch (error) {
      this.logger.error(
        'Health check failed',
        HealthService.name,
        String(error),
      );
      throw new HttpException(
        {
          status: 'ERROR',
          timestamp: new Date().toISOString(),
          message: 'Database connection failed',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
