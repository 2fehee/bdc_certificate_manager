import express from 'express';
import controller from './controller';
import { wrapSync } from '../controllerWrapper';

export default express
  .Router()
  .get('', wrapSync(controller.checkReadiness, true));
