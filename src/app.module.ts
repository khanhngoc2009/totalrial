import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexModule } from './module/index.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './module/user/entities/user.entities';
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
      entities: [User],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
