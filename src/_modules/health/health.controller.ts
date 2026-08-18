import { Controller, Get } from '@nestjs/common';
import type { HealthCheckResponseDto } from './dto/healthCheck.dto';
import { HealthService } from './health.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('')
  checkHealth(): Promise<HealthCheckResponseDto> {
    return this.healthService.checkHealth();
  }
}
