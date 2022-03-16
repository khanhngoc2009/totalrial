import { Injectable } from '@nestjs/common';

export interface ResponseData<T> {
  data: T;
  code: number;
  status: number;
  pagging?: {
    page?: number;
    limit?: number;
  };
}
export class ResponseApi {
  withSuccess(data: any): ResponseData<any> {
    return {
      data: data,
      code: 200,
      status: 1,
    };
  }
  withFalse(): ResponseData<any> {
    return {
      data: 'Lỗi',
      code: 404,
      status: 0,
    };
  }
}
