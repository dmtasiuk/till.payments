import { Injectable } from '@nestjs/common';
import { CustomerEntity } from './entities/customer.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { MerchantService } from '../merchant/merchant.service';
import { ValidationException } from '../core/exceptions/validation.exception';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  /**
   * @param {CustomerRepository} customerRepository
   * @param {MerchantService} merchantService
   */
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly merchantService: MerchantService,
  ) {
  }

  /**
   * @param {IPaginationOptions} options
   * @param {string} searchQuery
   */
  public paginate(options: IPaginationOptions, searchQuery: string | undefined): Promise<Pagination<CustomerEntity>> {
    return this.customerRepository.paginate(options, searchQuery);
  }

  /**
   * @param {string} id
   */
  public async find(id: string): Promise<CustomerEntity | null> {
    return await this.customerRepository.findById(id);
  }

  /**
   * @param {CreateCustomerDto} dto
   */
  public async create(dto: CreateCustomerDto): Promise<CustomerEntity> {
    await this.assertRequirements(dto);

    const entity = new CustomerEntity();

    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.email = dto.email;
    entity.merchantId = dto.merchantId;

    await this.customerRepository.save(entity);

    return await this.customerRepository.findById(entity.id)
  }

  /**
   * @param {string} customerId
   * @param {UpdateCustomerDto} dto
   */
  public async update(customerId: string, dto: UpdateCustomerDto): Promise<CustomerEntity> {
    const entity = await this.customerRepository.findOneOrFail(customerId);

    await this.assertRequirements(dto, customerId);

    entity.firstName = dto.firstName || entity.firstName;
    entity.lastName = dto.lastName || entity.lastName;
    entity.email = dto.email || entity.email;
    entity.merchantId = dto.merchantId || entity.merchantId;

    await this.customerRepository.save(entity);

    return await this.find(customerId);
  }

  /**
   * @param {string} id
   */
  public async delete(id: string): Promise<void> {
    await this.customerRepository.softDelete(id)
  }

  /**
   * @param dto
   * @param customerId
   */
  private async assertRequirements(
    dto: {merchantId: string, email: string}, customerId?: string | undefined,
  ) {
    await this.assertMerchantExist(dto.merchantId);
    await this.assertEmailIsUnique(dto.email, customerId);
  }

  /**
   * @param {string} merchantId
   */
  private async assertMerchantExist(merchantId: string) {
    const merchantEntity = await this.merchantService.findOne(merchantId);
    if (!merchantEntity) {
      throw new ValidationException([
        {
          merchantId: ['The given value is invalid'],
        },
      ]);
    }
  }

  private async assertEmailIsUnique(email: string, customerId?: string | undefined) {
    const existingEntity = await this.customerRepository.findByEmail(email);
    if (existingEntity && existingEntity.id !== customerId) {
      throw new ValidationException([
        {
          email: ['Customer with this email already exist'],
        },
      ]);
    }
  }
}
