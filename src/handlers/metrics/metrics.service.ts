import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, concatMap, map, Observable, of } from 'rxjs';
import { AppConfigService } from 'src/shared/config/app-config.service';
import { DatabaseError } from 'src/shared/database/database.error';
import { customDatabaseFailureStatus } from 'src/shared/database/database.status';
import { RepoEnum, TribeEnum } from 'src/shared/utils/repository.enum';
import { Repository as Repo } from 'typeorm';
import { repositoriesDB } from './domain/dto/repositories.dto';
import { Tribe } from './domain/entities/tribe.entity';
import {
  MockServiceStatus,
  repositoryStatus,
} from 'src/shared/utils/mockServicesRepo.status';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Tribe) private repositoryRepository: Repo<Tribe>,
    private readonly appConfigService: AppConfigService,
    private readonly httpService: HttpService,
  ) {}

  getMetrics(id_tribe: string): Observable<repositoriesDB[] | HttpException> {
    return of(id_tribe).pipe(
      //Check if tribe exits
      concatMap((id_tribe) =>
        this.getTribe(id_tribe).pipe(
          map((response) => {
            if (!response)
              throw new HttpException(
                TribeEnum.ERROR_NOT_FOUND,
                HttpStatus.NOT_FOUND,
              );
            return id_tribe;
          }),
        ),
      ),

      //check repo metrics filter
      concatMap((id_tribe) =>
        this.getRepositoriesMetrics(id_tribe).pipe(
          map((repositories) => {
            if (!repositories[0])
              throw new HttpException(
                TribeEnum.ERROR_NOT_COVERAGE,
                HttpStatus.NOT_FOUND,
              );
            return repositories;
          }),
        ),
      ),

      //Check API MOCK verification status
      concatMap((repos) => this.getVerificationStatus(repos)),

      catchError((e) => {
        const error = e.response?.data || e.message;

        throw new DatabaseError({
          status: HttpStatus.BAD_REQUEST,
          internalUse: JSON.stringify(error),
          general: customDatabaseFailureStatus.METRICS,
          code: HttpStatus.BAD_REQUEST,
        });
      }),
    );
  }

  private getTribe(id_tribe: string): Observable<any> {
    return of(id_tribe).pipe(
      concatMap((id_tribe) =>
        this.repositoryRepository.findOne({ where: { id_tribe: id_tribe } }),
      ),
    );
  }

  private getRepositoriesMetrics(id_tribe: string): Observable<any> {
    return of(id_tribe).pipe(
      concatMap((id_tribe) =>
        this.repositoryRepository
          .createQueryBuilder('tribe')
          .leftJoinAndSelect('tribe.repository', 'repository')
          .leftJoinAndSelect('tribe.organization', 'organization')
          .leftJoinAndSelect(
            'metrics',
            'm',
            'repository.id_repository = m.id_repository',
          )
          .where('tribe.id_tribe = :id_tribe', { id_tribe: id_tribe })
          .andWhere('repository.state = :state', { state: RepoEnum.ENABLED })
          .andWhere(
            "date_part('year', repository.create_time) = :create_time",
            { create_time: new Date().getFullYear() },
          )
          .andWhere('m.coverage > :coverage', {
            coverage: this.appConfigService.getNumberEnv('minCoveragePercent'),
          })
          .select(
            "repository.id_repository as id, repository.name as name, tribe.name as tribe, organization.name as organization, m.coverage as coverage, m.code_smells as codeSmells, m.bugs as bugs, m.vulnerabilities as vulnerabilities, m.hotspot as hotspots, '' as VerificationState, repository.state as state",
          )
          .execute(),
      ),
    );
  }

  private getVerificationStatus(
    repos: repositoriesDB[],
  ): Observable<repositoriesDB[]> {
    const url = this.appConfigService.getStringEnv('mockService');
    return of(repos).pipe(
      concatMap((repositories) =>
        this.httpService.get(url).pipe(
          map((repositoriesMock) => {
            const reposMockService = repositoriesMock.data.repositories;
            const resRepositories = repositories.map((repository) => {
              const finerdRepoMock = reposMockService
                .filter((reposMock) => reposMock.id === repository.id)
                .map((mock) => mock.state);

              if (finerdRepoMock) {
                repository.verificationstate =
                  MockServiceStatus[finerdRepoMock];
              } else {
                repository.verificationstate = 'NA';
              }
              repository.state = repositoryStatus[repository.state];

              return repository;
            });

            return resRepositories;
          }),
        ),
      ),
    );
  }
}
