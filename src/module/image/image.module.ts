import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseApi } from 'src/api.response';
import { ImageController } from './controller/image.controller';
import { Image } from './entites/image.entites';
import { ImageService } from './service/image.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService, ResponseApi],
})
export class ImageModule {}
