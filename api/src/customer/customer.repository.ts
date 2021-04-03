import { EntityRepository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { BaseRepository } from '../core/repositories/base.repository';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends BaseRepository<CustomerEntity> {

  paginate(
    options: IPaginationOptions,
    searchQuery: string | undefined,
  ): Promise<Pagination<CustomerEntity>> {
    const queryBuilder = this.createQueryBuilder('customer');

    queryBuilder.leftJoinAndSelect('customer.merchant', 'merchant');
    queryBuilder.addOrderBy('customer.createdAt', 'DESC');

    this.appendLikeQuery(
      queryBuilder,
      searchQuery,
      ['firstName', 'lastName', 'email'],
    );

    return this.doPaginate(options, queryBuilder);
  }

  findById(customerId: string) {
    return this.findOneOrFail({
      where: { id: customerId },
      relations: ['merchant'],
    })
  }

  findByEmail(email: string) {
    return this.findOne({
      where: {
        email,
      },
    })
  }
}
