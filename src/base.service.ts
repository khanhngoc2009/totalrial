import * as jwt from 'jsonwebtoken';
export class BaseService {
  async token(payload: string): Promise<string> {
    const token = jwt.sign(payload, 'shhhhh');
    return token;
  }
}
