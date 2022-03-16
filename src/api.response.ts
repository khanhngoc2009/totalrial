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
      code: 200,
      status: 1,
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
