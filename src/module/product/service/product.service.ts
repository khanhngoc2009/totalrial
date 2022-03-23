import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { Connection, Repository } from 'typeorm';
import { Product } from '../entities/product.entities';
import { ProductReponsitory } from '../reponsitory/product.reponsitory';

@Injectable()
export class ProductService extends BaseService {
  public productRepository: Repository<Product>;
  constructor(private conection: Connection) {
    super();
    this.productRepository =
      this.conection.getCustomRepository(ProductReponsitory);
  }
}
