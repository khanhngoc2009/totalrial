import { Injectable } from '@nestjs/common';
import { ResponseData } from 'src/api.response';
import { BaseService } from 'src/base.service';
import { Connection, Repository } from 'typeorm';
import { User } from '../entities/user.entities';
import { UserReponsitory } from '../reponsitory/user.reponsitory';
import { LoginDto, UserDto, UserDtoResponse } from '../user.dto';
import { UserTranfromer } from '../user.transform';

@Injectable()
export class UserService extends BaseService {
  public repository: Repository<User>;
  public tranform: UserTranfromer;
  constructor(private conection: Connection) {
    super();
    this.repository = this.conection.getCustomRepository(UserReponsitory);
    this.tranform = new UserTranfromer();
  }
  async getAll() {
    return await this.repository.find();
  }
  async getToken(payload: string): Promise<string> {
    return this.token(payload);
  }
  async createUser(userDto: UserDto): Promise<string> {
    try {
      if (!userDto.user_name || !userDto.password) {
        return 'false';
      }
      userDto.password = await this.hassPass(userDto.password);
      await this.repository.save(userDto);
      return 'Thành công';
    } catch (error) {
      return 'false';
    }
  }

  async loginUser(loginDto: LoginDto): Promise<ResponseData<UserDtoResponse>> {
    try {
      if (!loginDto.user_name || !loginDto.password) {
        return this.withFalse();
      }
      const user: User = await this.repository.findOne({
        user_name: loginDto.user_name,
      });
      if (!user) return this.withFalse();
      const isPassword = await this.checkPass({
        hash: user.password,
        password: loginDto.password,
      });
      if (!isPassword) return this.withFalse();
      const userResponse: UserDtoResponse = this.tranform.changeUser(user);
      return this.withSuccess(userResponse);
    } catch (error) {
      return this.withFalse();
    }
  }
}
