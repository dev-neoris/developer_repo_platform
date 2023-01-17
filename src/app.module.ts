import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './handlers/organization/organization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './shared/config/app-config.module';
import { AppConfigService } from './shared/config/app-config.service';
import { LoggerConfigModule } from './infrastructure/logger/logger-config.module';
import { LoggerConfigService } from './infrastructure/logger/logger-config.service';
import { WinstonModule } from 'nest-winston';
import { MetricsModule } from './handlers/metrics/metrics.module';

@Module({
  imports: [
    AppConfigModule,
    WinstonModule.forRootAsync({
      imports: [LoggerConfigModule],
      inject: [LoggerConfigService],
      useFactory: (loggerConfig: LoggerConfigService) => ({
        transports: loggerConfig.console.transports,
        exitOnError: loggerConfig.console.exitOnError,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appServiceConf: AppConfigService) => ({
        url: appServiceConf.getStringEnv('connectionStringCDB'),
        type: 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    OrganizationModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
