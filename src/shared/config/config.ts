import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({

  //Environment
  appName: process.env.APP_NAME,
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,

  //CockroachDB
  connectionStringCDB: process.env.CONNECTION_STRING_CDB
}));
