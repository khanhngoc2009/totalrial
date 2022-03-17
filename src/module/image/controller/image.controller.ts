import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ImageService } from '../service/image.service';
@ApiTags('Image')
@Controller(`image`)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(`list`)
  async getAllImage() {
    return await this.imageService.getAll();
  }
}
