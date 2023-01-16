import { Global, Logger, Module } from '@nestjs/common';
import { AppConfigService } from 'src/shared/config/app-config.service';


import { LoggerConfigService } from './logger-config.service';

@Global()
@Module({
  providers: [LoggerConfigService, AppConfigService, Logger],
  exports: [LoggerConfigService, AppConfigService, Logger],
})
export class LoggerConfigModule {}
