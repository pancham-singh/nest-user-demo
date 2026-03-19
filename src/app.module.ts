import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerRepository } from './respositories/customers/customer.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,CustomerRepository],
})
export class AppModule {}
