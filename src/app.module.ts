/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseApi } from './api.response';
import { Cart } from './module/cart/Cart';
import { Image } from './module/image/entites/image.entites';
import { IndexModule } from './module/index.module';
import { Product } from './module/product/entities/product.entities';
import { User } from './module/user/entities/user.entities';
@Global()
@Module({
  imports: [
    IndexModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'salon_db',
      entities: [User, Image, Product, Cart],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [ResponseApi],
})
export class AppModule {}
