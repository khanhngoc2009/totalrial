import { Global, Module } from '@nestjs/common';
import { UploadController } from './controller/upload.controller';
@Global()
@Module({
  imports: [],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
