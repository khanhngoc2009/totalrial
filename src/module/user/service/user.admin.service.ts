import { HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ErrorException, ResponseData } from 'src/api.response';
import { RequestListUserAdmin } from 'src/app.interface';
import { BaseService } from 'src/base.service';
import { Connection, Repository } from 'typeorm';
import {
  RequestCreateUserAdmin,
  UserAdminDtoResponse,
  UserRequestDetail,
  UserRequestStatus,
} from '../dto/user.admin.dto';
import { User } from '../entities/user.entities';
import { UserReponsitory } from '../reponsitory/user.reponsitory';
import { DEFIND_EXPEPTION } from '../user.contant';

@Injectable()
export class UserAdminService extends BaseService {
  public userRepository: Repository<User>;
  constructor(private conection: Connection) {
    super();
    this.userRepository = this.conection.getCustomRepository(UserReponsitory);
  }

  async getAllUsers(
    headerAuthon: string,
    params: RequestListUserAdmin,
  ): Promise<any> {
    if (!params.page)
      throw new ErrorException(HttpStatus.NOT_FOUND, 'Kiểm tra lại');

    if (!headerAuthon || headerAuthon.length < 8)
      throw new ErrorException(HttpStatus.FORBIDDEN);

    const token = headerAuthon.replace('Bearer ', '');
    const res: User = await this.generalToken(`${token}`);

    if (!res)
      throw new ErrorException(HttpStatus.UNAUTHORIZED, DEFIND_EXPEPTION.token);

    const [users, count] = await this.userRepository.findAndCount({
      select: [
        'id',
        'first_name',
        'images',
        'is_active',
        'phone',
        'token',
        'user_name',
        'role',
      ],
      relations: ['images'],
      skip: +params.limit * (+params.page - 1),
      take: +params.limit,
      order: { id: 'DESC' },
    });

    const responseUsers = users.map((user) =>
      plainToClass(UserAdminDtoResponse, user),
    );

    return { users: responseUsers, count };
  }

  async createUser(user: RequestCreateUserAdmin): Promise<any> {
    if (
      user.role === undefined ||
      !user.password ||
      !user.phone ||
      !user.user_name
    )
      throw new ErrorException(HttpStatus.NOT_FOUND, 'Validate error');

    const resultUser = await this.userRepository.findOne({
      where: { user_name: user.user_name },
    });

    if (resultUser)
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        DEFIND_EXPEPTION.found_account,
      );

    user.password = await this.hassPass(user.password);

    await this.userRepository.save(user);
    return this.withSuccess(DEFIND_EXPEPTION.success);
  }

  async changeStatusUser(
    payload: UserRequestStatus,
  ): Promise<ResponseData<string>> {
    await this.userRepository.save({
      id: payload.user_id,
      is_active: payload.status === 0 ? false : true,
    });

    return this.withSuccess('Thành công');
  }

  async detailUser(payload: UserRequestDetail): Promise<ResponseData<string>> {
    try {
      const user = await this.userRepository.find({
        where: { id: payload.user_id },
        relations: ['images'],
      });
      return this.withSuccess(user);
    } catch (e) {
      throw new ErrorException(HttpStatus.FAILED_DEPENDENCY);
    }
  }

  async deleteUser(payload: UserRequestDetail): Promise<ResponseData<string>> {
    try {
      const user = await this.userRepository.find({
        where: { id: payload.user_id },
      });
      await this.userRepository.remove(user);
      return this.withSuccess(user);
    } catch (e) {
      throw new ErrorException(HttpStatus.FAILED_DEPENDENCY);
    }
  }
}
