import { Body, Controller, Get, Headers, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/api.response';
import { HeaderRequestInterface } from 'src/app.interface';
import { Roles } from 'src/module/auth/decorator/roles.decorator';
import { Role } from 'src/module/auth/role/role.enum';
import {
  LoginDto,
  UserDto,
  UserDtoResponse,
  UserUpdateRequest,
} from '../dto/user.dto';
import { User } from '../entities/user.entities';
import { UserService } from '../service/user.service';

@ApiTags('Customer')
@Controller(`customer`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() body: UserDto) {
    try {
      return await this.userService.registerUser(body);
    } catch (error) {
      throw error.message;
    }
  }

  @Put('login')
  async loginUser(
    @Body() data: LoginDto,
  ): Promise<ResponseData<UserDtoResponse>> {
    try {
      return await this.userService.loginUser(data);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiBearerAuth()
  @Get('profile')
  @Roles(Role.Admin, Role.User)
  async getProfile(
    @Headers() headers: HeaderRequestInterface,
  ): Promise<ResponseData<User>> {
    try {
      return await this.userService.profileUser(headers);
    } catch (error) {
      throw error.message;
    }
  }

  @ApiBearerAuth()
  @Put('update-profile')
  @Roles(Role.Admin, Role.User)
  async putUpdateProfile(
    @Headers() headers: HeaderRequestInterface,
    @Body() body: UserUpdateRequest,
  ): Promise<ResponseData<User>> {
    return await this.userService.updateProfile({
      header: headers,
      value: body,
    });
  }
}
