import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { parse } from 'json2csv';
import { join } from 'path';
import { map, Observable } from 'rxjs';
import { LoggingTraceInterceptor } from 'src/shared/interceptor/logger-trace-interceptor.service';
import { resCreateOrganizationDto } from '../organization/domain/dto/crud-org.dto';
import { repositoriesDB } from './domain/dto/repositories.dto';
import { MetricsService } from './metrics.service';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Controller('metrics')
@ApiTags('Metrics - service to get the repositories metrics in a tribe')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Get(':id_tribe')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: resCreateOrganizationDto,
  })
  @ApiOperation({ summary: 'Get the repositories metrics search by tribe' })
  @ApiParam({
    name: 'id_tribe',
    description: 'id for search repositories metrics by tribe',
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(LoggingTraceInterceptor)
  getMetrics(
    @Param('id_tribe') id_tribe: string,
  ): Observable<repositoriesDB[] | HttpException> {
    return this.metricsService.getMetrics(id_tribe);
  }

  @Get('reporte/:id_tribe')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: resCreateOrganizationDto,
  })
  @ApiOperation({ summary: 'Get the repositories metrics search by tribe' })
  @ApiParam({
    name: 'id_tribe',
    description: 'id for search repositories metrics by tribe',
  })
  @HttpCode(HttpStatus.OK)
  @Header(
    'Content-Disposition',
    'attachment; filename="repositories-metrics.csv"',
  )
  @UseInterceptors(LoggingTraceInterceptor)
  getMetricsReporte(
    @Param('id_tribe') id_tribe: string,
  ): Observable<StreamableFile> {
    return this.metricsService.getMetrics(id_tribe).pipe(
      map((response) => {
        const csv = parse(response);
        const myuuid = uuidv4();

        fs.writeFile(
          `./src/shared/files/repositories-metrics${myuuid}.csv`,
          csv,
          function (err) {
            if (err) return console.error(err);
            console.log('File created!');
            return true;
          },
        );

        const file = createReadStream(
          join(
            process.cwd(),
            `./src/shared/files/repositories-metrics${myuuid}.csv`,
          ),
        );
        file.on('end', function () {
          fs.unlink(
            `./src/shared/files/repositories-metrics${myuuid}.csv`,
            function () {
              console.log('file deleted');
            },
          );
        });

        return new StreamableFile(file);
      }),
    );
  }
}
