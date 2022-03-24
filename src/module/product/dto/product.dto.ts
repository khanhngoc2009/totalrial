import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from '../../image/image.dto';

export class LoginDto {
  @ApiProperty()
  user_name: string;

  @ApiProperty()
  password: string;
}

export class UserDto extends LoginDto {
  @ApiProperty()
  last_name: string;

  @ApiProperty()
  first_name: string;
}

export class UserDtoResponse extends UserDto {
  @ApiProperty()
  full_name: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  images: ImageDto[];

  @ApiProperty()
  token?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  role: number;
}

export class UserUpdateRequest {
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  phone: string;
}
