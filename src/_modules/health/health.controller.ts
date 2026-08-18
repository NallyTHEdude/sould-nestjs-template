import { Controller, Get } from '@nestjs/common';
import type { HealthCheckResponseDTO } from './dto/healthCheckDTO';
import { HealthService } from './health.service';

@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('')
  checkHealth(): Promise<HealthCheckResponseDTO> {
    return this.healthService.checkHealth();
  }
}
