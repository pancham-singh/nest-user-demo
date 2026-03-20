import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerRepository } from './respositories/customers/customer.repository';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [AppController, HealthController],
  providers: [AppService, CustomerRepository],
})
export class AppModule {}
