import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseApi } from 'src/api.response';
import { ProductAdminController } from './controller/product.admin.controller';
import { ProductController } from './controller/product.controller';
import { Product } from './entities/product.entities';
import { ProductAdminService } from './service/product.admin.service';
import { ProductService } from './service/product.service';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [ProductController, ProductAdminController],
  providers: [ProductService, ResponseApi, ProductAdminService],
})
export class ProductModule {}
