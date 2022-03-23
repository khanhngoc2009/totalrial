import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin/product')
@Controller(`admin/product`)
export class ProductAdminController {
  constructor(private readonly productAdminService: ProductAdminController) {}
}
