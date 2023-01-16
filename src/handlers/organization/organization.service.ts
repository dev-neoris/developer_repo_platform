import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { organization } from './domain/entities/organization.entity';
import { createOrganizationDto } from './domain/dto/create-org.dto'
import { concatMap, from, map, Observable, of } from 'rxjs';
import { off } from 'process';

@Injectable()
export class OrganizationService {
    constructor(@InjectRepository(organization) private organizationRepository: Repository<organization>){ 
    }

    createOrganization(orgReq: createOrganizationDto): Observable<any>{
        const newOrganization = this.organizationRepository.create(orgReq);
        return   from(this.organizationRepository.save(newOrganization)).pipe(
            map((org: organization) => org)
        )           
    }
}
