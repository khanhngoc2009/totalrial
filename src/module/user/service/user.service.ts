import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorException, ResponseData } from 'src/api.response';
import { BaseService } from 'src/base.service';
import { laughValue } from 'src/maper.module';
import { Image } from 'src/module/image/entites/image.entites';
import { ImageDto } from 'src/module/image/image.dto';
import { Connection, Repository } from 'typeorm';
import { User } from '../entities/user.entities';
import { UserReponsitory } from '../reponsitory/user.reponsitory';
import { DEFIND_EXPEPTION } from '../user.contant';
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

  async getAll(headerAuthon: string) {
    if (headerAuthon.length < 8) throw new ErrorException(HttpStatus.FORBIDDEN);

    const token = headerAuthon.replace('Bearer ', '');
    const res = this.generalToken(`${token}`);

    if (!res)
      throw new ErrorException(HttpStatus.UNAUTHORIZED, DEFIND_EXPEPTION.token);

    return await this.repository.find({ relations: ['images'] });
  }

  async getToken(payload: string): Promise<ResponseData<any>> {
    const tken = await this.token(payload);
    const res = this.withSuccess(`${tken}`);
    return res;
  }

  async createUser(userDto: UserDto): Promise<ResponseData<string>> {
    try {
      if (!userDto.user_name || !userDto.password)
        throw new ErrorException(
          HttpStatus.NOT_FOUND,
          DEFIND_EXPEPTION.not_found_user_pass,
        );

      if (this.repository.findOne({ where: { user_name: userDto.user_name } }))
        throw new ErrorException(
          HttpStatus.NOT_FOUND,
          DEFIND_EXPEPTION.found_account,
        );

      userDto.password = await this.hassPass(userDto.password);
      await this.repository.save(userDto);
      return this.withSuccess(DEFIND_EXPEPTION.success);
    } catch (error) {
      throw new ErrorException(HttpStatus.NOT_FOUND, 'Error');
    }
  }

  async loginUser(loginDto: LoginDto): Promise<ResponseData<UserDtoResponse>> {
    if (!loginDto.user_name || !loginDto.password)
      throw new ErrorException(HttpStatus.NOT_FOUND);

    const user: User = await this.repository.findOne({
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
      new ErrorException(HttpStatus.UNAUTHORIZED, DEFIND_EXPEPTION.pass_word);

    //array anh
    const arrayImage = user.images.map((img) => {
      return laughValue({
        dto: ImageDto,
        entites: Image,
        value: img,
      });
    });

    //create token
    const token = await this.token(loginDto);
    if (!token)
      throw new ErrorException(HttpStatus.UNAUTHORIZED, DEFIND_EXPEPTION.token);

    const userResponse: UserDtoResponse = {
      ...this.tranform.changeUser(user),
      images: arrayImage,
      token: token,
    };

    return this.withSuccess(userResponse);
  }
}
