import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { hrtime } from 'process';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { nanosecondsToSeconds } from '../utils/time-manipulation';
import {
  LoggerBuilding,
  LogStructure,
} from 'src/infrastructure/logger/logger-structure.dto';
import { loggerObfuscation } from 'src/infrastructure/logger/logger-obfuscation';

@Injectable()
export class LoggingTraceInterceptor implements NestInterceptor {
  private readonly appName = this.appConfigService.getStringEnv('appName');

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly appConfigService: AppConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const startTime = hrtime.bigint();

    return next.handle().pipe(
      tap((httpMessage) => {
        const endTime = hrtime.bigint();
        const requestDuration = nanosecondsToSeconds(endTime - startTime);

        const infoLog = this.buildLoggerStructure({
          request,
          requestDuration,
          httpMessage,
          response,
        });

        this.logger.log(infoLog, infoLog.httpDetails.url);
      }),
      catchError((error: HttpException | Error) => {
        const endTime = hrtime.bigint();
        const requestDuration = nanosecondsToSeconds(endTime - startTime);

        const errorLog = this.buildLoggerStructure({
          request,
          requestDuration,
          error,
        });

        this.logger.error(
          errorLog,
          error['response'],
          error['response']['internalUse'],
        );
        throw error;
      }),
    );
  }

  buildLoggerStructure({
    request,
    response,
    httpMessage,
    requestDuration,
    error,
  }: LoggerBuilding): LogStructure {
    const { url, method, body } = request || {};
    const { statusCode } = response || {};
    const e = this.buildError(error);
    const log = {
      requestDuration,
      XAppId: this.appName,
      httpDetails: {
        httpMethod: method,
        httpStatusCode: statusCode,
        url,
        httpMessage,
      },
      error: e,
      payload: body,
    };

    return loggerObfuscation(log, false);
  }

  buildError(error: Error | HttpException) {
    return (
      error && {
        status:
          error instanceof HttpException
            ? error?.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message,
        stack: error?.stack,
      }
    );
  }
}
