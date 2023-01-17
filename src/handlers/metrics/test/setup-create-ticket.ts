import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { HttpService } from '@nestjs/axios';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { MetricsModule } from '../metrics.module';
import { AppConfigService } from 'src/shared/config/app-config.service';
import { MetricsService } from '../metrics.service';


export function setupCreateTicketTest(): TestingModuleBuilder {
  const appConfigService = {
    getEnv: jest.fn(() => ''),
    getBooleanEnv: jest.fn(),
  };

  const mockLog = {
    error: jest.fn(),
    info: jest.fn(),
  };

  return Test.createTestingModule({
    imports: [MetricsModule],
    providers: [
      AppConfigService,
      MetricsService,
      HttpService,
      {
        provide: WINSTON_MODULE_NEST_PROVIDER,
        useValue: mockLog,
      },
    ],
  })

    .overrideProvider(AppConfigService)
    .useValue(appConfigService);
}


export const createTicketResponseSuccess = {
  status: 'SUCCESS_ticket_creation',
  contextOutput: {
    responseDataMap: {
      caseNumber: ['2134asdf2'],
      caseId: ['7991'],
      ticketUrl: ['/7991?lenguage=es'],
    },
  },
};


