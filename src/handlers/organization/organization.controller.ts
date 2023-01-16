import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { createOrganizationDto } from './domain/dto/create-org.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
@ApiTags('Organization - colaborative repo for developers')
export class OrganizationController {

    constructor(private organizationService: OrganizationService){}

    @Post()
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: createOrganizationDto
      })
    @ApiOperation({ summary: 'Create a organization in the colaborative repo' })
    @HttpCode(HttpStatus.OK)
    createOrganization(@Body() orgRequest: createOrganizationDto
    ): Observable<createOrganizationDto>{

       return this.organizationService.createOrganization(orgRequest);


    }
}
