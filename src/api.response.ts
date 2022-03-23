import { HttpException } from '@nestjs/common';

export interface ResponseData<T> {
  data: T;
  code: number;
  status: number;
  messgae?: string;
  pagging?: {
    page?: number;
    limit?: number;
  };
}
export class ResponseApi {
  withSuccess(data: any): ResponseData<any> {
    return {
      code: 200,
      status: 1,
      messgae: 'Thành công',
      data: data,
    };
  }
  withFalse(): ResponseData<any> {
    return {
      code: 404,
      status: 0,
      data: 'Lỗi',
    };
  }
}

export class ErrorException extends HttpException {
  constructor(status: number, message?: string) {
    super(
      {
        code: 0,
        status: status,
        data: message ?? 'Lỗi mất rồi',
      },
      status,
    );
  }
}
