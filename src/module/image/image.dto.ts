import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @AutoMap()
  @ApiProperty()
  url: string;
  @AutoMap()
  @ApiProperty()
  is_active: boolean;
}
