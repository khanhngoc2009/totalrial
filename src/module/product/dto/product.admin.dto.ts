import { ApiProperty } from '@nestjs/swagger';
import { RequestListUserAdmin } from 'src/app.interface';
import { UserDto, UserDtoResponse } from './user.dto';

export interface BodyCreateProduct {
  productName: string;
  price: number;
  url: string;
  quantity: number;
  quantityRemain: number;
}
export interface ListProductAdmin extends BodyCreateProduct {
  id: number;
  isActive: number;
}

export class ListProductRequest extends RequestListUserAdmin {}
