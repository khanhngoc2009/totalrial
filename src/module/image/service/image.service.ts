import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Image } from '../entites/image.entites';
import { ImageReponsitory } from '../respository/image.repository';

@Injectable()
export class ImageService {
  public repository: Repository<Image>;
  constructor(private conection: Connection) {
    this.repository = this.conection.getCustomRepository(ImageReponsitory);
  }
  async getAll(): Promise<any> {
    try {
      const res = await this.repository.find({ relations: ['user.images'] });
      console.log({ res });
      return res;
    } catch (e) {
      return null;
    }
  }
}
