import log from '../../common/logger';
import { Request, Response, NextFunction } from 'express';
// import traceInfo from '../../common/traceInfo';

export default function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  //  log.error(`${(err.stack || err.error || err)}`, 'ErrorLogging', traceInfo.createTraceInfo(req));
  log.error(`error-log: ${err.stack}`);
  next(err);
}
