import express from 'express';
import controller from './controller';
import { wrapAsync } from '../controllerWrapper';
import { providerAuth } from '../../middlewares/auth.handler';
import { userAuth } from '../../middlewares/auth.handler';

export default express
  .Router()
  .get('/preparation/newInfo', wrapAsync(controller.getNewInfo))
  .post('/sendSignedTx', wrapAsync(controller.newCertificate))
  .get('/certificateInfo', wrapAsync(controller.getCertificateInfo))
  .get(
    '/checkLatestCertificate',
    wrapAsync(controller.getCheckLatestCertificate)
  )
  .get('/checkOldCertificate', wrapAsync(controller.getCheckOldCertificate))
  .get('/certificateCount', wrapAsync(controller.getCertificateCount))
