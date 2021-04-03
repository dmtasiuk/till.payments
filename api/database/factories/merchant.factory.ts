import { MerchantEntity } from '../../src/merchant/entities/merchant.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

// @ts-ignore
define(MerchantEntity, (faker: typeof Faker) => {
  const merchantEntity = new MerchantEntity();

  merchantEntity.name = faker.company.companyName();
  merchantEntity.currency = faker.random.arrayElement(['AUD', 'USD', 'EURO']);
  merchantEntity.isTrading = faker.random.boolean();

  return merchantEntity;
});
