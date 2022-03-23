import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities/product.entities';

@EntityRepository(Product)
export class ProductReponsitory extends Repository<Product> {}
