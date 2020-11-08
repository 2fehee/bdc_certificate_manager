import { Request, Response, NextFunction } from 'express';
import BizError from '../../common/error/bizError';
import ErrorCode from '../../common/error/errorCode';
import responseTemplate from '../../common/responseTemplate';

// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let bizError = err;
  if (!bizError.eCode) {
    bizError = new BizError(ErrorCode.TRANSACTION_FAILED, err.message);
  }
  const { eCode, eMessage, statusCode } = bizError;
  res
    .status(statusCode)
    .json(responseTemplate(undefined, { code: eCode, message: eMessage }));
}
