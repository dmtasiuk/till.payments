import { Controller, Get, Query } from '@nestjs/common';
import { MerchantService } from './merchant.service';

@Controller('merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {
  }

  @Get()
  public index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string | undefined,
  ) {
    return this.merchantService.paginate({ page, limit }, search);
  }
}
