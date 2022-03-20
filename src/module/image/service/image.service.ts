import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ResponseData } from 'src/api.response';
import { BaseService } from 'src/base.service';
import { Connection, Repository } from 'typeorm';
import { Image } from '../entites/image.entites';
import { ImageDto } from '../image.dto';
import { ImageReponsitory } from '../respository/image.repository';

@Injectable()
export class ImageService extends BaseService {
  public repository: Repository<Image>;

  constructor(private conection: Connection) {
    super();
    this.repository = this.conection.getCustomRepository(ImageReponsitory);
  }
  async getAll(): Promise<ResponseData<ImageDto[]>> {
    const res = await this.repository.find();
    // const photos = await this.repository.find({ relations: ['user'] });

    const array = res.map((value) => {
      const response: ImageDto = plainToClass(ImageDto, value);
      return response;
    });
    return this.withSuccess(array);
  }
  async createImage(payload: {
    image: ImageDto;
  }): Promise<ResponseData<ImageDto>> {
    const res = await this.repository.save(payload.image);
    return this.withSuccess(res);
  }
}
