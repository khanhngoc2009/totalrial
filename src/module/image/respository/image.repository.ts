import { EntityRepository, Repository } from 'typeorm';
import { Image } from '../entites/image.entites';

@EntityRepository(Image)
export class ImageReponsitory extends Repository<Image> {}
