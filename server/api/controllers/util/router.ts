import express from 'express';
import controller from './controller';
import { wrapAsync, wrapSync } from '../controllerWrapper';

export default express
  .Router()
  .post('/sign', wrapAsync(controller.sign))
  .get('/accountKeyPair', wrapSync(controller.generateAccountKeyPair));
