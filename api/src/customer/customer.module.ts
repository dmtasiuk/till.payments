import { Module } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { MerchantModule } from '../merchant/merchant.module';

@Module({
  imports: [MerchantModule, TypeOrmModule.forFeature([CustomerRepository])],
  controllers: [CustomerController],
  providers: [CustomersService],
})
export class CustomerModule {
}
