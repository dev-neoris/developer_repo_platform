import winston, { format, transports } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/shared/config/app-config.service';

@Injectable()
export class LoggerConfigService {
  private readonly options: winston.LoggerOptions;

  constructor(private readonly configService: AppConfigService) {
    this.options = this._getOpions();
  }

  private _getOpions(): winston.LoggerOptions {
    return {
      exitOnError: false,

      transports: [
        new transports.Console({ 
          format: format.combine(
            format.timestamp(),
            format.ms(),
            format.errors({ stack: true }), 
            nestWinstonModuleUtilities.format.nestLike(
              this.configService.getStringEnv("appName")
            ),
          ),
        }),
        // other transports...
      ], // alert > error > warning > notice > info > debug
    };
  }

  get console(): winston.LoggerOptions {
    return this.options;
  }
}