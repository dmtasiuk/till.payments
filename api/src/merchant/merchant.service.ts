import { Injectable } from '@nestjs/common';
import { MerchantRepository } from './merchant.repository';
import { MerchantEntity } from './entities/merchant.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class MerchantService {
  /**
   * @param {MerchantRepository} merchantRepository
   */
  constructor(private readonly merchantRepository: MerchantRepository) {
  }

  /**
   * @param {IPaginationOptions} options
   * @param {string} searchQuery
   */
  public paginate(options: IPaginationOptions, searchQuery: string | undefined): Promise<Pagination<MerchantEntity>> {
    return this.merchantRepository.paginate(options, searchQuery);
  }

  public async findOne(merchantId: string): Promise<MerchantEntity | undefined> {
    return await this.merchantRepository.findOne(merchantId)
  }
}
