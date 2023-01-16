import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [config],
      validationSchema: Joi.object({
        APP_ENV: Joi.string().required().valid('dev', 'stage', 'test', 'prod').default('dev'),
        APP_NAME: Joi.string().required().default('developer_repo_platform'),
        APP_PORT: Joi.number().required().default(8080), 
        CONNECTION_STRING_CDB: Joi.string().required().default('') 
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
