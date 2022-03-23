import { ApiProperty } from '@nestjs/swagger';
import { UserDto, UserDtoResponse } from './user.dto';

export class RequestCreateUserAdmin extends UserDto {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: number;
}

export class UserAdminDtoResponse extends UserDtoResponse {}

export class UserRequestDetail {
  @ApiProperty()
  user_id: number;
}

export class UserRequestStatus extends UserRequestDetail {
  @ApiProperty()
  status: number;
}
