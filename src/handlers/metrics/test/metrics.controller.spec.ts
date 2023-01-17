import { HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { MetricsController } from '../metrics.controller';
import { createTicketResponseSuccess, setupCreateTicketTest } from './setup-create-ticket';
import * as request from 'supertest';

describe('MetricsController', () => {
  describe('Get repo metrics by tribe', () => {
    let controller: MetricsController;
    let app: INestApplication;


    const mockServiceMockRepo = {
      "repositories": [
        {
          "id": "6eeab31a-549f-45dc-9cff-ae653f8672ba",
          "state": 606
        },
        {
          "id": "dd558a56-4c53-4af9-b5fd-2b2e5b241bbf",
          "state": 606
        }
      ]
    };

    let httpService = {
      post: jest
        .fn()
        .mockImplementationOnce(() => of(mockServiceMockRepo))
    };

    beforeEach(async () => {
      const moduleRef: TestingModule = await setupCreateTicketTest()
        .overrideProvider(HttpService)
        .useValue(httpService)
        .compile();

      app = moduleRef.createNestApplication();
      await app.init();
    });

    it('should create ticket successfully', async () => {
      return request(app.getHttpServer())
        .get('/6eeab31a-549f-45dc-9cff-ae653f8672ba')
        .send()
        .expect(200)
        .expect(createTicketResponseSuccess);
    });

    afterAll(async () => {
      await app.close();
    });

  });


});
