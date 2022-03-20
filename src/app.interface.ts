import { ApiProperty } from '@nestjs/swagger';

export interface HeaderRequestInterface {
  host: any;
  connection: string;
  authorization: string;
  referer: string;
  'accept-language': string;
}

export class RequestList {
  @ApiProperty({ default: 1 })
  page?: number;
  @ApiProperty({ default: 10 })
  limit?: number;
}

export class RequestListUserAdmin extends RequestList {
  @ApiProperty()
  search?: string;
  @ApiProperty()
  start_date: string;
  @ApiProperty()
  end_date: string;
}
