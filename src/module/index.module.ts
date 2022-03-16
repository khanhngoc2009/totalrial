import { Module } from '@nestjs/common';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ImageModule],
})
export class IndexModule {}
