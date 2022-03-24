import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorException } from 'src/api.response';
import { BaseService } from 'src/base.service';
import { Connection, Repository } from 'typeorm';
import {
  BodyCreateProduct,
  BodyUpdateProduct,
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
    const [rows, count] = await this.productRepository.findAndCount({
      select: ['id', 'price', 'productName', 'quantity', 'url', 'status'],
      skip: +params.limit * (+params.page - 1),
      take: +params.limit,
      order: { id: 'DESC' },
    });
    return this.withSuccess({ rows, count });
  }

  async updateProduct(payload: {
    id: number;
    body: BodyUpdateProduct;
  }): Promise<any> {
    const { body, id } = payload;
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product)
      throw new ErrorException(HttpStatus.NOT_FOUND, 'Không tồn tại');
    const dataUpdate = { ...product, ...body };
    const productUpdate = await this.productRepository.save(dataUpdate);

    return this.withSuccess(productUpdate);
  }

  async deleteProduct(payload: { id: number }): Promise<any> {
    const { id } = payload;

    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product)
      throw new ErrorException(HttpStatus.NOT_FOUND, 'Sản phẩm không tồn tại');

    await this.productRepository.remove(product);

    return this.withSuccess(product);
  }
}
