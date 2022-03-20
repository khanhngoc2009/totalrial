import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ErrorException } from 'src/api.response';
import {
  HeaderRequestInterface,
  RequestListUserAdmin,
} from 'src/app.interface';
import { Roles } from 'src/module/auth/decorator/roles.decorator';
import { Role } from 'src/module/auth/role/role.enum';
import {
  RequestCreateUserAdmin,
  UserRequestDetail,
  UserRequestStatus,
} from '../dto/user.admin.dto';
import { UserAdminService } from '../service/user.admin.service';

@ApiTags('Admin/user')
@Controller(`admin/user`)
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}

  @ApiBearerAuth()
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'start_date', required: false })
  @ApiQuery({ name: 'end_date', required: false })
  @Roles(Role.Admin)
  @Get(`list`)
  async getAllUser(
    @Headers() headers: HeaderRequestInterface,
    @Query() params: RequestListUserAdmin,
  ) {
    return await this.userAdminService.getAllUsers(
      headers.authorization,
      params,
    );
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post('create')
  async createUser(@Body() body: RequestCreateUserAdmin) {
    return this.userAdminService.createUser(body);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Put('change-status')
  async changeStatus(@Body() body: UserRequestStatus) {
    if (body.status === undefined || !body.user_id)
      throw new ErrorException(HttpStatus.NOT_FOUND, 'Validate error');

    return this.userAdminService.changeStatusUser(body);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Put('detail')
  async getDetailUser(@Query() params: UserRequestDetail) {
    if (!params.user_id)
      throw new ErrorException(HttpStatus.NOT_FOUND, 'Validate error');

    return this.userAdminService.detailUser(params);
  }
}
