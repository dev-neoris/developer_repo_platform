import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { Delete, Param, UseInterceptors } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { LoggingTraceInterceptor } from 'src/shared/interceptor/logger-trace-interceptor.service';
import {
  createOrganizationDto,
  resCreateOrganizationDto,
  resDeleteOrganizationDto,
  resUpdateganizationDto,
  updateOrganizationDto,
} from './domain/dto/crud-org.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
@ApiTags('Organization - colaborative repo for developers')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: resCreateOrganizationDto,
  })
  @ApiOperation({ summary: 'Create a organization in the colaborative repo' })
  @HttpCode(HttpStatus.OK)
  createOrganization(
    @Body() orgRequest: createOrganizationDto,
  ): Observable<resCreateOrganizationDto> {
    return this.organizationService.createOrganization(orgRequest);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [resCreateOrganizationDto],
  })
  @ApiOperation({ summary: 'Get all organizations' })
  @HttpCode(HttpStatus.OK)
  getOrganizations(): Observable<resCreateOrganizationDto[]> {
    return this.organizationService.getOrganizations();
  }

  @Get(':id_organization')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: resCreateOrganizationDto,
  })
  @ApiOperation({ summary: 'Get specific organization' })
  @ApiParam({
    name: 'id_organization',
    description: 'id for search a organization',
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(LoggingTraceInterceptor)
  getOrganization(
    @Param('id_organization') id_organization: string,
  ): Observable<resCreateOrganizationDto | HttpException> {
    return this.organizationService.getOrganization(id_organization);
  }

  @Delete(':id_organization')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: resDeleteOrganizationDto,
  })
  @ApiOperation({ summary: 'Delete specific organization' })
  @ApiParam({
    name: 'id_organization',
    description: 'id for delete a organization',
  })
  @HttpCode(HttpStatus.OK)
  deleteOrganization(
    @Param('id_organization') id_organization: string,
  ): Observable<resDeleteOrganizationDto> {
    return this.organizationService.deleteOrganization(id_organization);
  }

  @Patch(':id_organization')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: resUpdateganizationDto,
  })
  @ApiOperation({ summary: 'Update specific organization' })
  @ApiParam({
    name: 'id_organization',
    description: 'id for update a organization',
  })
  @HttpCode(HttpStatus.OK)
  updateOrganization(
    @Param('id_organization') id_organization: string,
    @Body() org: updateOrganizationDto,
  ): Observable<resUpdateganizationDto | HttpException> {
    return this.organizationService.updateOrganization(id_organization, org);
  }
}
