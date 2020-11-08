import { Application } from 'express';
import healthRouter from './api/controllers/health/router';
import certificateRouter from './api/controllers/certificate/router';
import utilRouter from './api/controllers/util/router';

export default function routes(app: Application): void {
  app.use(`${process.env.APP_CONTEXT_PATH}/readiness`, healthRouter);
  app.use(`${process.env.APP_CONTEXT_PATH}/certificate`, certificateRouter);
  app.use(`${process.env.APP_CONTEXT_PATH}/util`, utilRouter);
}
