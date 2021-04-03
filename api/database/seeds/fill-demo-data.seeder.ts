import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { TransactionEntity } from '../../src/merchant/entities/transaction.entity';
import { random } from 'lodash';
import { MerchantEntity } from '../../src/merchant/entities/merchant.entity';
import { CustomerEntity } from '../../src/customer/entities/customer.entity';

export default class FillDemoData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    if (this.alreadySeeded(connection)) {
      return;
    }
    const merchants = await factory(MerchantEntity)().createMany(10);

    for (const merchant of merchants) {
      const customers = await factory(CustomerEntity)().createMany(random(3, 10), {
        merchantId: merchant.id,
      });

      for (const customer of customers) {
        await factory(TransactionEntity)().createMany(random(1, 20), {
          customerId: customer.id,
          merchantId: customer.merchantId,
        })
      }
    }
  }

  private async alreadySeeded(connection: Connection) {
    return await connection.createQueryBuilder()
      .select()
      .from('merchants', 'm')
      .getCount() > 0;
  }
}
