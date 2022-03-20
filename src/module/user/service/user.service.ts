import { HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ErrorException, ResponseData } from 'src/api.response';
import { HeaderRequestInterface } from 'src/app.interface';
import { BaseService } from 'src/base.service';
import { Connection, Repository } from 'typeorm';
import {
  LoginDto,
  UserDto,
  UserDtoResponse,
  UserUpdateRequest,
} from '../dto/user.dto';
import { User } from '../entities/user.entities';
import { UserReponsitory } from '../reponsitory/user.reponsitory';
import { DEFIND_EXPEPTION } from '../user.contant';

@Injectable()
export class UserService extends BaseService {
  public userRepository: Repository<User>;
  constructor(private conection: Connection) {
    super();
    this.userRepository = this.conection.getCustomRepository(UserReponsitory);
  }

  async registerUser(userDto: UserDto): Promise<ResponseData<string>> {
    if (!userDto.user_name || !userDto.password)
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        DEFIND_EXPEPTION.not_found_user_pass,
      );
    const user = await this.userRepository.findOne({
      where: { user_name: userDto.user_name },
    });

    if (user)
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        DEFIND_EXPEPTION.found_account,
      );

    userDto.password = await this.hassPass(userDto.password);
    await this.userRepository.save(userDto);
    return this.withSuccess(DEFIND_EXPEPTION.success);
  }

  async loginUser(loginDto: LoginDto): Promise<ResponseData<UserDtoResponse>> {
    if (!loginDto.user_name || !loginDto.password)
      throw new ErrorException(HttpStatus.NOT_FOUND);

    const user: User = await this.userRepository.findOne({
      relations: ['images'],
      where: { user_name: loginDto.user_name },
    });

    //user not found
    if (!user)
      throw new ErrorException(
        HttpStatus.UNAUTHORIZED,
        DEFIND_EXPEPTION.user_name,
      );

    const isPassword = await this.checkPass({
      hash: user.password,
      password: loginDto.password,
    });

    //password incorrect
    if (!isPassword)
      throw new ErrorException(
        HttpStatus.UNAUTHORIZED,
        DEFIND_EXPEPTION.pass_word,
      );

    //create token
    const token = await this.token({
      id: user.id,
      date: new Date().toISOString(),
    });
    if (!token)
      throw new ErrorException(HttpStatus.UNAUTHORIZED, DEFIND_EXPEPTION.token);

    await this.userRepository.save({ ...user, token: token });

    const userResponse: UserDtoResponse = {
      ...plainToClass(UserDtoResponse, user),
      token: token,
    };

    return this.withSuccess(userResponse);
  }

  async profileUser(
    payload: HeaderRequestInterface,
  ): Promise<ResponseData<User>> {
    try {
      const userId: { id: number } = await this.generateTokenAuthorization(
        payload.authorization,
      );

      console.log(userId);

      const user = await this.userRepository.find({
        where: { id: +userId.id },
        relations: ['images'],
      });
      return this.withSuccess(user);
    } catch (e) {
      throw new ErrorException(HttpStatus.FAILED_DEPENDENCY);
    }
  }

  async updateProfile(payload: {
    header: HeaderRequestInterface;
    value: UserUpdateRequest;
  }): Promise<ResponseData<User>> {
    try {
      const { header, value } = payload;
      const userId: { id: number } = await this.generateTokenAuthorization(
        header.authorization,
      );
      const user = await this.userRepository.save({
        id: +userId.id,
        ...value,
      });
      return this.withSuccess(user);
    } catch (e) {
      throw new ErrorException(HttpStatus.FAILED_DEPENDENCY);
    }
  }
}
