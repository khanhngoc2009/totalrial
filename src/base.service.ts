import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ErrorException, ResponseApi } from './api.response';
import { HttpStatus } from '@nestjs/common';
import { LoginDto, UserDto } from './module/user/user.dto';
export class BaseService extends ResponseApi {
  constructor() {
    super();
  }

  // create token
  async token(payload: UserDto | string | LoginDto): Promise<string> {
    try {
      console.log({ payload });

      const token = jwt.sign(payload, 'inform');
      return token;
    } catch (e) {
      throw new ErrorException(HttpStatus.FAILED_DEPENDENCY);
    }
  }

  //general token
  async generalToken(token: string): Promise<string | jwt.JwtPayload> {
    try {
      const data = jwt.verify(token, 'inform');
      return data;
    } catch (e) {
      throw new ErrorException(HttpStatus.EXPECTATION_FAILED);
    }
  }

  // hass password
  async hassPass(payload: string): Promise<string> {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(payload, saltRounds);
    return hash;
  }

  // check correct password
  async checkPass(params: {
    hash: string;
    password: string;
  }): Promise<boolean> {
    const { hash, password } = params;
    return bcrypt.compareSync(password, hash);
  }
}
