import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ResponseApi } from './api.response';
export class BaseService extends ResponseApi {
  constructor() {
    super();
  }
  async token(payload: string): Promise<string> {
    const token = jwt.sign(payload, 'shhhhh');
    return token;
  }
  async hassPass(payload: string): Promise<string> {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(payload, saltRounds);
    return hash;
  }
  async checkPass(params: {
    hash: string;
    password: string;
  }): Promise<boolean> {
    const { hash, password } = params;
    return bcrypt.compareSync(password, hash);
  }
}
