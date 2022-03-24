import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorException, ResponseData } from 'src/api.response';
import { Roles } from 'src/module/auth/decorator/roles.decorator';
import { Role } from 'src/module/auth/role/role.enum';
import {
  BodyCreateProduct,
  BodyUpdateProduct,
  DetailParams,
  ListProductRequest,
} from '../dto/product.admin.dto';
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
  async listProduct(
    @Query() params: ListProductRequest,
  ): Promise<ResponseData<Product>> {
    try {
      return await this.productAdminService.listProduct(params);
    } catch (error) {
      throw error.message;
    }
  }

  @Post('create')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async createProduct(
    @Body() body: BodyCreateProduct,
  ): Promise<ResponseData<Product>> {
    try {
      if (+body.price < 0 || +body.quantity < 0) {
        throw new ErrorException(HttpStatus.FAILED_DEPENDENCY, 'validate');
      }
      return await this.productAdminService.createProduct({ product: body });
    } catch (error) {
      throw new ErrorException(HttpStatus.FAILED_DEPENDENCY);
    }
  }

  @Put('update')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async updateProduct(
    @Body() body: BodyUpdateProduct,
    @Query() params: DetailParams,
  ): Promise<ResponseData<Product>> {
    try {
      if (+body.price < 0 || +body.quantity < 0) {
        throw new ErrorException(HttpStatus.FAILED_DEPENDENCY, 'validate');
      }
      return await this.productAdminService.updateProduct({
        id: params.id,
        body: body,
      });
    } catch (error) {
      throw new ErrorException(HttpStatus.FAILED_DEPENDENCY);
    }
  }
}
