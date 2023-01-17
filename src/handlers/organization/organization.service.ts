import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './domain/entities/organization.entity';
import {
  createOrganizationDto,
  resCreateOrganizationDto,
  resDeleteOrganizationDto,
  resUpdateganizationDto,
  updateOrganizationDto,
} from './domain/dto/crud-org.dto';
import { catchError, from, map, Observable } from 'rxjs';
import { DatabaseError } from 'src/shared/database/database.error';
import { customDatabaseFailureStatus } from 'src/shared/database/database.status';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  createOrganization(
    orgReq: createOrganizationDto,
  ): Observable<resCreateOrganizationDto> {
    const newOrganization = this.organizationRepository.create(orgReq);
    return from(this.organizationRepository.save(newOrganization)).pipe(
      map((org: Organization) => org),
    );
  }

  getOrganizations(): Observable<resCreateOrganizationDto[]> {
    return from(this.organizationRepository.find()).pipe(
      map((orgs: Organization[]) => orgs),
    );
  }
  getOrganization(
    id_organization: string,
  ): Observable<resCreateOrganizationDto | HttpException> {
    return from(
      this.organizationRepository.findOne({
        where: { id_organization: id_organization },
      }),
    ).pipe(
      catchError((e) => {
        const error = e.response?.data || e.message;

        throw new DatabaseError({
          status: HttpStatus.BAD_REQUEST,
          internalUse: JSON.stringify(error),
          general: customDatabaseFailureStatus.UUID,
          code: HttpStatus.BAD_REQUEST,
        });
      }),
      map((orgs: Organization) => {
        if (orgs) return orgs;
        else
          return new HttpException(
            'organization not found',
            HttpStatus.NOT_FOUND,
          );
      }),
    );
  }

  deleteOrganization(
    id_organization: string,
  ): Observable<resDeleteOrganizationDto> {
    return from(
      this.organizationRepository.delete({ id_organization: id_organization }),
    ).pipe(map((orgs: resDeleteOrganizationDto) => orgs));
  }

  updateOrganization(
    id_organization: string,
    org: updateOrganizationDto,
  ): Observable<resUpdateganizationDto> {
    return from(
      this.organizationRepository.update({ id_organization }, org),
    ).pipe(map((orgs: resUpdateganizationDto) => orgs));
  }
}
