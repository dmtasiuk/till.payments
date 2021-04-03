import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';

import * as path from 'path';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { MerchantEntity } from '../merchant/entities/merchant.entity';
import { TransactionEntity } from '../merchant/entities/transaction.entity';

// Register database entities
const databaseEntities = [
  CustomerEntity,
  MerchantEntity,
  TransactionEntity,
];

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '../config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return Object.assign(config.get('database'), {
          entities: databaseEntities,
          synchronize: false,
        });
      },
      inject: [ConfigService],
    }),
  ],
})
@Global()
export class CoreModule {

}
