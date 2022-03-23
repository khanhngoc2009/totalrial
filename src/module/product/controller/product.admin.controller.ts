import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/api.response';
import { HeaderRequestInterface } from 'src/app.interface';
import { Roles } from 'src/module/auth/decorator/roles.decorator';
import { Role } from 'src/module/auth/role/role.enum';
import { ListProductRequest } from '../dto/product.admin.dto';
import { Product } from '../entities/product.entities';
import { ProductAdminService } from '../service/product.admin.service';

@ApiTags('Admin/product')
@Controller(`admin/product`)
export class ProductAdminController {
  constructor(private readonly productAdminService: ProductAdminService) {}

  @Get('list')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'start_date', required: false })
  @ApiQuery({ name: 'end_date', required: false })
  async loginUser(
    @Query() params: ListProductRequest,
  ): Promise<ResponseData<Product>> {
    try {
      return await this.productAdminService.listProduct(params);
    } catch (error) {
      throw error.message;
    }
  }
}
