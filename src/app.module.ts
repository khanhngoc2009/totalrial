import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseApi } from './api.response';
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
      database: 'k1',
      entities: [User, Image, Product],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [ResponseApi],
})
export class AppModule {}
