import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AppConfigService } from './shared/config/app-config.service';
import project_properties from './infrastructure/project_properties';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);

  const port = configService.get('APP_PORT');

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));


  const configSwagger = new DocumentBuilder()
  .setTitle('Developer repo platform')
  .setDescription(
    'This is a colaborative place for developers.',
  )
  .setVersion('1.0')
  .addTag('Repo')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, configSwagger);

SwaggerModule.setup('api', app, document);
  await app.listen(port);

  Logger.log(`Listening on http://localhost:${port}`, 'main.ts')
  Logger.log(`App ${project_properties.name}  version:${project_properties.version}`, 'main.ts')
}
bootstrap();
