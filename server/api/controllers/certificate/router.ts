import express from 'express';
import controller from './controller';
import { wrapAsync } from '../controllerWrapper';
import { providerAuth } from '../../middlewares/auth.handler';
import { userAuth } from '../../middlewares/auth.handler';

export default express
  .Router()
  .post('/SignedTx', wrapAsync(controller.sendSignedTx))
  .get('/preparation/newBNFTTxObject', wrapAsync(controller.getNewBNFTTxObject))
  .get(
    '/preparation/removeBNFTTxObject',
    wrapAsync(controller.getRemoveBNFTTxObject)
  )
  .get(
    '/preparation/transferFromBNFTTxObject',
    wrapAsync(controller.getTransferFromBNFTTxObject)
  )
  .get('/ownerOfBNFT/', wrapAsync(controller.getOwnerOfBNFT))
  .get('/tokenURIBNFT/', wrapAsync(controller.getTokenURIBNFT))
  .get('/totalSupplyBNFT/', wrapAsync(controller.getTotalSupplyBNFT))
  .post(
    '/preparation/newCertiTxObject',
    wrapAsync(controller.getNewCertiTxObject)
  )
  .get(
    '/preparation/removeCertiTxObject',
    wrapAsync(controller.getRemoveCertiTxObject)
  )
  .get('/certificateInfo', wrapAsync(controller.getCertificateInfo))
  .post(
    '/checkLatestCertificate',
    wrapAsync(controller.getCheckLatestCertificate)
  )
  .post('/checkOldCertificate', wrapAsync(controller.getCheckOldCertificate))
  .get('/certificateCount', wrapAsync(controller.getCertificateCount))
  .get(
    '/preparation/transferBPTTxObject',
    wrapAsync(controller.getTransferBPTTxObject)
  )
  .get('/symbolBPT/', wrapAsync(controller.getSymbolBPT))
  .get('/totalSupplyBPT/', wrapAsync(controller.getTotalSupplyBPT))
  .get('/balanceOfBPT/', wrapAsync(controller.getBalanceOfBPT));
