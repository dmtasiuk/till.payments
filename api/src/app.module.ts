import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { MerchantModule } from './merchant/merchant.module';
import { CustomerModule } from './customer/customer.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [CoreModule, MerchantModule, CustomerModule],
  controllers: [AuthController],
})
export class AppModule {
}
