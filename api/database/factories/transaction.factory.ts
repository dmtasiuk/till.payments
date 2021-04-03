import { TransactionEntity } from '../../src/merchant/entities/transaction.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { random } from 'lodash';

// @ts-ignore
define(TransactionEntity, (faker: typeof Faker) => {
  const transactionEntity = new TransactionEntity();

  transactionEntity.amount = parseFloat(random(100, 50000));
  transactionEntity.description = faker.random.words();
  transactionEntity.ccLastFour = random(4);
  transactionEntity.ccExpiry = `${random(1, 12)}/${random(1)}`;
  transactionEntity.ccToken = faker.random.uuid();

  return transactionEntity;
});
