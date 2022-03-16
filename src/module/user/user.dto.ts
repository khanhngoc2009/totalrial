import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Image } from '../image/entites/image.entites';

export class LoginDto {
  @AutoMap()
  @ApiProperty()
  user_name: string;
  @ApiProperty()
  password: string;
}

export class UserDto extends LoginDto {
  @AutoMap()
  @ApiProperty()
  last_name: string;
  @AutoMap()
  @ApiProperty()
  first_name: string;
}

export class UserDtoResponse extends UserDto {
  @AutoMap()
  @ApiProperty()
  full_name: string;
  @AutoMap()
  @ApiProperty()
  is_active: boolean;
  @ApiProperty()
  images: Image[];
}
