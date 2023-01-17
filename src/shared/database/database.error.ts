import { HttpException, HttpStatus } from '@nestjs/common';
import { customDatabaseFailureStatus } from './database.status';

type DatabaseErrorDto = {
  status: number;
  internalUse?: string;
  general?: string;
  code?: number;
};

export class DatabaseError extends HttpException {
  constructor(error: DatabaseErrorDto) {
    super(
      {
        status: error.status,
        internalUse: error.internalUse,
        general: error.general || customDatabaseFailureStatus.NOT_FOUND,
      },
      error.code || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
