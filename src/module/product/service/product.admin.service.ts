import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { Connection, Repository } from 'typeorm';
import {
  BodyCreateProduct,
  ListProductRequest,
} from '../dto/product.admin.dto';
import { Product } from '../entities/product.entities';
import { ProductReponsitory } from '../reponsitory/product.reponsitory';

@Injectable()
export class ProductAdminService extends BaseService {
  public productRepository: Repository<Product>;
  constructor(private conection: Connection) {
    super();
    this.productRepository =
      this.conection.getCustomRepository(ProductReponsitory);
  }

  async createProduct(params: { product: BodyCreateProduct }): Promise<any> {
    const { product } = params;
    const productSave = await this.productRepository.save(product);
    return this.withSuccess(productSave);
  }

  async listProduct(params: ListProductRequest): Promise<any> {
    const products: Product[] = await this.productRepository.find({
      select: ['id', 'price', 'productName', 'quantity', 'url', 'status'],
      skip: +params.limit * (+params.page - 1),
      take: +params.limit,
      order: { id: 'DESC' },
    });
    return this.withSuccess(products);
  }
}
