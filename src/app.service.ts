import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './respositories/customers/customer.repository';
import { CustomerDto } from './dto/customer.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AppService {
  constructor(readonly customerRepository: CustomerRepository) {}
  
  getCustomer(id?: number){
    try {
      return this.customerRepository.getCustomerById(id);
    } catch (error) {
      throw new NotFoundException('Customer not found');
    }
  }

  createCustomer(customer: CustomerDto):any {
    try {
    return this.customerRepository.createCustomer(customer);
    } catch (error) {
      if (error instanceof Error && error.message === 'Customer not found') {
        throw new ConflictException('Customer not found');
      }
    }
  }
}
