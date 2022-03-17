import { Body, Controller, Get, Headers, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/api.response';
import { HeaderRequestInterface } from 'src/app.interface';
import { UserService } from '../service/user.service';
import { LoginDto, UserDto, UserDtoResponse } from '../user.dto';

@ApiTags('Customer')
@Controller(`customer`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get(`list`)
  async getAllUser(@Headers() headers: HeaderRequestInterface) {
    return await this.userService.getAll(headers.authorization);
  }

  @Get(`getToken`)
  async getToken() {
    return await this.userService.getToken('khanh' + `${new Date().getTime()}`);
  }

  @Post('register')
  async registerUser(@Body() body: UserDto) {
    return await this.userService.createUser(body);
  }

  @Put('login')
  async loginUser(
    @Body() data: LoginDto,
  ): Promise<ResponseData<UserDtoResponse>> {
    return await this.userService.loginUser(data);
  }
}
