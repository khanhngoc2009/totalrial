import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/module/auth/decorator/roles.decorator';
import { Role } from 'src/module/auth/role/role.enum';
import { ImageService } from '../service/image.service';
@ApiTags('Image')
@Controller(`image`)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiBearerAuth()
  @Roles(Role.User)
  @Get(`list`)
  async getAllImage() {
    try {
      return await this.imageService.getAll();
    } catch (e) {
      throw e.message;
    }
  }
}
