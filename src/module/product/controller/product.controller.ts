import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../service/product.service';

@ApiTags('Product')
@Controller(`product`)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}
