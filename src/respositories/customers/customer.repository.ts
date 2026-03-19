import { ConflictException, ConsoleLogger, Injectable } from "@nestjs/common";
import e from "express";
import { CUSTOMERS } from "src/constants/customers";
import { CustomerDto } from "src/dto/customer.dto";

@Injectable()
export class CustomerRepository {
    customers =CUSTOMERS
  async createCustomer(customer: CustomerDto): Promise<CustomerDto | undefined> {
    const existingCustomer = await this.getCustomerByEmail(customer.email);
    if (existingCustomer) {
      throw new ConflictException('Customer with this email already exists');
    }
    const newCustomer = { ...customer, id: this.customers.length + 1 };
    this.customers.push(newCustomer);
    return newCustomer;
  }
  
  async getCustomerByEmail(email: string): Promise<CustomerDto |null> {
    const customer =this.customers.find((c) => c.email ===email);
    return customer || null;
  }
 async getCustomerById(id?: number): Promise<CustomerDto | CustomerDto[]> {
    console.log('customerRepository.getCustomerById called with id:', id);
    const customer = id ? this.customers.find((c) => c.id === id) : this.customers;
    if (!customer && id) {
      throw new Error('Customer not found');
    }
    return customer || [];
  }
}