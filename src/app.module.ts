import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexModule } from './module/index.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './module/user/entities/user.entities';
import { ResponseApi } from './api.response';
import { Image } from './module/image/entites/image.entites';
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
      entities: [User, Image],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ResponseApi],
})
export class AppModule {}
