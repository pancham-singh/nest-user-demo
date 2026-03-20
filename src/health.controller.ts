import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private healthService: HealthCheckService,
  ) {
  }
  @Get()
  @HealthCheck()
  async healthCheck() {
    return await this.healthService.check([]);
  }
}
