import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  user_id: number;
}
