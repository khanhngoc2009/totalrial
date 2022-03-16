import { Body, Controller, Get, Headers, Post, Put } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseApi, ResponseData } from 'src/api.response';
import { UserService } from '../service/user.service';
import { LoginDto, UserDto, UserDtoResponse } from '../user.dto';
interface Header {
  host: any;
  connection: string;
  authorization: string;
  referer: string;
  'accept-language': string;
}

@Controller(`customer`)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private responseApi: ResponseApi,
  ) {}

  @Get(`list`)
  async getAllUser() {
    return await this.userService.getAll();
  }
  @ApiBearerAuth()
  @Get(`getToken`)
  async getToken(@Headers() headers: Header) {
    console.log({ headers });
    if (headers.authorization)
      return await this.userService.getToken(
        'khanh' + `${new Date().getTime()}`,
      );
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
