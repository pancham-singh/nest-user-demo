import { Body, Controller, Get,Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customers')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createCustomer(@Body() customer: CustomerDto): Promise<CustomerDto> {
    return this.appService.createCustomer(customer);
  }

  @Get()
  getCustomer(@Query() query: any): Promise<CustomerDto | CustomerDto[]> {
    return this.appService.getCustomer(+query.id);
  }
}
