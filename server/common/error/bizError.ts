import { ErrorCode } from './errorCode';

class BizError extends Error {
  eCode: number;
  eMessage: string;
  statusCode: number;

  constructor(errorCode: ErrorCode, exMessage?: string) {
    super();
    this.eCode = errorCode.eCode;
    this.eMessage = exMessage ? exMessage : errorCode.eMessage;
    this.statusCode = errorCode.statusCode;
  }
}

export default BizError;
