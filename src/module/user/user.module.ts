import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseApi } from 'src/api.response';
import { UserAdminController } from './controller/user.admin.controller';
import { UserController } from './controller/user.controller';
import { User } from './entities/user.entities';
import { UserAdminService } from './service/user.admin.service';
import { UserService } from './service/user.service';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [UserController, UserAdminController],
  providers: [UserService, ResponseApi, UserAdminService],
})
export class UserModule {}
