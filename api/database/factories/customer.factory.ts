import { CustomerEntity } from '../../src/customer/entities/customer.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

// @ts-ignore
define(CustomerEntity, (faker: typeof Faker) => {
  const customerEntity = new CustomerEntity();

  customerEntity.firstName = faker.name.firstName();
  customerEntity.lastName = faker.name.lastName();
  customerEntity.email = faker.internet.email().toLowerCase();

  return customerEntity;
});
