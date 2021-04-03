import { EntityRepository } from 'typeorm';
import { MerchantEntity } from './entities/merchant.entity';
import { BaseRepository } from '../core/repositories/base.repository';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@EntityRepository(MerchantEntity)
export class MerchantRepository extends BaseRepository<MerchantEntity> {
  public paginate(
    options: IPaginationOptions,
    searchQuery: string | undefined,
  ): Promise<Pagination<MerchantEntity>> {
    const queryBuilder = this.createQueryBuilder('merchant');
    queryBuilder.addOrderBy('merchant.createdAt', 'DESC');

    this.appendLikeQuery(queryBuilder, searchQuery, ['name']);

    return this.doPaginate(options, queryBuilder)
  }
}

