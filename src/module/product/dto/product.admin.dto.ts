import { ApiProperty } from '@nestjs/swagger';
import { RequestListUserAdmin } from 'src/app.interface';

export class BodyCreateProduct {
  @ApiProperty()
  productName: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  url: string;
  @ApiProperty()
  quantity: number;
}
export class ListProductAdmin extends BodyCreateProduct {
  @ApiProperty()
  id: number;
  @ApiProperty()
  isActive: number;
}

export class ListProductRequest extends RequestListUserAdmin {}

export class DetailParams {
  @ApiProperty()
  id: number;
}

export class BodyUpdateProduct extends BodyCreateProduct {
  @ApiProperty()
  status?: number;
}
