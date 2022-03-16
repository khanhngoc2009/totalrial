import { Injectable } from '@nestjs/common';
import { ResponseData } from 'src/api.response';
import { BaseService } from 'src/base.service';
import { laughValue } from 'src/maper.module';
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
    try {
      const res = await this.repository.find({ where: { user_id: 2 } });
      const photos = await this.repository.find({ relations: ['user'] });
      console.log(photos);

      const array = res.map((value) => {
        const response: ImageDto = laughValue({
          dto: ImageDto,
          entites: Image,
          value: value,
        });
        return response;
      });
      return this.withSuccess(array);
    } catch (e) {
      return this.withFalse();
    }
  }
}
