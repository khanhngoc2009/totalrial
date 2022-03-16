import { Controller, Get, Headers } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
interface Header {
  host: any;
  connection: string;
  authorization: string;
  referer: string;
  'accept-language': string;
}

@Controller(`customer`)
export class UserController {
  constructor(private readonly userService: UserService) {}
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
}
