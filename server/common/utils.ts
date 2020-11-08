import { Request } from 'express';
import l from './logger';
import { TransactionReceipt, EventLog } from 'web3-core';

function _makeArgsList(argsName: string, args: any): string {
  return !args || Object.keys(args).length === 0
    ? ''
    : `, ${argsName} = ${JSON.stringify(args)}`;
}

function _makeReqArgs(argsName: string, args: any): string {
  return !args || Object.keys(args).length === 0
    ? ''
    : `${argsName} = ${JSON.stringify(args)}`;
}

export const requestLogging = (req: Request, fnName: string): void => {
  const queryArgs = _makeArgsList('Query Params', req.query);
  const bodyArgs = _makeArgsList('Body', req.body);
  const params = _makeArgsList('Params ', req.params);
  l.info(
    `Path = ${req.baseUrl +
      req.path}, Function = ${fnName}${queryArgs}${bodyArgs}${params}`
  );
};

export const getRequestParams = (req: Request): string => {
  const queryArgs = _makeReqArgs('Query Params', req.query);
  const bodyArgs = _makeReqArgs('Body', req.body);
  const params = _makeReqArgs('Params ', req.params);
  return `${queryArgs}${bodyArgs}${params}`;
};
