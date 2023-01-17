import { HttpException } from '@nestjs/common';

export class LogStructure {
  requestDuration: number;
  XAppId: string;
  httpDetails: {
    httpMethod: string;
    httpStatusCode: number;
    httpMessage?: string;
    url: string;
  };
  error?: ErrorResponse;
  payload: any;
}

export class ErrorResponse {
  status: number;
  message: string;
  stack: string;
}

export class Request {
  url: string;
  method: string;
  body: Record<string, unknown> | undefined;
  statusCode: number;
}

export class LoggerBuilding {
  request?: Request;
  response?: any;
  httpMessage?: any;
  requestDuration: number;
  error?: Error | HttpException;
}
