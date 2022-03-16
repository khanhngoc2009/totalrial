import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseApi } from 'src/api.response';
import { UserController } from './controller/user.controller';
import { User } from './entities/user.entities';
import { UserService } from './service/user.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, ResponseApi],
})
export class UserModule {}
