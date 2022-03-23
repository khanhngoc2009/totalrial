import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ImageModule, AuthModule, UploadModule, ProductModule],
})
export class IndexModule {}
