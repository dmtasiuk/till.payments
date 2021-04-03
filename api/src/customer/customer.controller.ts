import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { EntityNotFoundInterceptor } from '../core/interceptors/entity-not-found.interceptor';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomersService) {
  }

  @Get()
  public index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string | undefined,
  ) {
    return this.customerService.paginate({ page, limit }, search);
  }

  @Get('/:id')
  @UseInterceptors(EntityNotFoundInterceptor)
  public async view(
    @Param('id') customerId: string,
  ) {
    return await this.customerService.find(customerId);
  }

  @Post()
  @UseInterceptors(EntityNotFoundInterceptor)
  @HttpCode(HttpStatus.CREATED)
  public create(@Body()createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }


  @Put('/:id')
  @UseInterceptors(EntityNotFoundInterceptor)
  @HttpCode(HttpStatus.ACCEPTED)
  public update(
    @Param('id') customerId: string,
    @Body()updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(customerId, updateCustomerDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id') customerId: string,
  ) {
    await this.customerService.delete(customerId);
  }
}
