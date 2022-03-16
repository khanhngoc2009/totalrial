import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { Connection, Repository } from 'typeorm';
import { User } from '../entities/user.entities';
import { UserReponsitory } from '../reponsitory/user.reponsitory';

@Injectable()
export class UserService extends BaseService {
  public repository: Repository<User>;
  constructor(private conection: Connection) {
    super();
    this.repository = this.conection.getCustomRepository(UserReponsitory);
  }
  async getAll() {
    return await this.repository.find();
  }
  async getToken(payload: string): Promise<string> {
    return this.token(payload);
  }
}
