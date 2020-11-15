import CertificateService from '../../services/certificate.service';
import { Request, Response } from 'express';
import l from '../../../common/logger';
import multer from 'multer';

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface txObject {
  nonce: string;
  from: string;
  gas: string;
  gasPrice: string;
  to: string;
  data: string;
}

const upload = multer({
  storage: multer.memoryStorage(),
}).single('uploadDocument');

export class Controller {
  async sendSignedTx(req: Request): Promise<string> {
    const { signedData } = req.body;
    l.info('signedData : ' + signedData);

    // eslint-disable-next-line prefer-const
    const receipt = await CertificateService.callSendSignedTx(signedData);

    l.info('returnReceipt : ' + JSON.stringify(receipt));

    const transactionHash = JSON.stringify(receipt.transactionHash);

    return transactionHash;
  }

  async getNewBNFTTxObject(req): Promise<txObject> {
    let returnResult: txObject;

    l.info('req.query.from : ' + req.query.from);

    const addressFrom: string = req.query.from;
    const bID: number = req.query.bID;
    const manufacturerName: string = req.query.manufacturerName;
    const modelName: string = req.query.modelName;
    const manufacturerDate: string = req.query.manufacturerDate;

    const getNewBNFTTxObjectResult = await CertificateService.callGetNewBNFTTxObject(
      addressFrom,
      bID,
      manufacturerName,
      modelName,
      manufacturerDate
    );

    // eslint-disable-next-line prefer-const
    returnResult = getNewBNFTTxObjectResult;
    l.info('returnResult : ' + JSON.stringify(returnResult));

    return returnResult;
  }

  async getRemoveBNFTTxObject(req): Promise<txObject> {
    let returnResult: txObject;

    l.info('req.query.from : ' + req.query.from);

    const addressFrom: string = req.query.from;
    const bID: number = req.query.bID;

    // eslint-disable-next-line prefer-const
    const getRemoveBNFTTxObjectResult = await CertificateService.callGetRemoveBNFTTxObject(
      addressFrom,
      bID
    );

    // eslint-disable-next-line prefer-const
    returnResult = getRemoveBNFTTxObjectResult;
    l.info('returnResult : ' + JSON.stringify(returnResult));

    return returnResult;
  }

  async getTransferFromBNFTTxObject(req): Promise<txObject> {
    let returnResult: txObject;

    l.info('req.query.from : ' + req.query.from);

    const addressFrom: string = req.query.from;
    const transferFrom: string = req.query.transferFrom;
    const transferTo: string = req.query.transferTo;
    const bID: number = req.query.bID;

    // eslint-disable-next-line prefer-const
    const getTransferFromBNFTTxObjectResult = await CertificateService.callGetTransferFromBNFTTxObject(
      addressFrom,
      transferFrom,
      transferTo,
      bID
    );

    // eslint-disable-next-line prefer-const
    returnResult = getTransferFromBNFTTxObjectResult;
    l.info('returnResult : ' + JSON.stringify(returnResult));

    return returnResult;
  }

  async getOwnerOfBNFT(req): Promise<string> {
    l.info('req.query.bID : ' + req.query.bID);

    const bID: number = req.query.bID;

    // eslint-disable-next-line prefer-const
    const getOwnerOfBNFTResult = await CertificateService.callGetOwnerOfBNFT(
      bID
    );

    l.info('getOwnerOfBNFTResult : ' + getOwnerOfBNFTResult);

    return getOwnerOfBNFTResult;
  }

  async getTokenURIBNFT(req): Promise<string> {
    l.info('req.query.bID : ' + req.query.bID);

    const bID: number = req.query.bID;

    // eslint-disable-next-line prefer-const
    const getTokenURIBNFTResult = await CertificateService.callGetTokenURIBNFT(
      bID
    );

    l.info('getTokenURIBNFTResult : ' + getTokenURIBNFTResult);

    return getTokenURIBNFTResult;
  }

  async getTotalSupplyBNFT(req): Promise<string> {
    // eslint-disable-next-line prefer-const
    const getTotalSupplyBNFTResult = await CertificateService.callGetTotalSupplyBNFT();

    l.info('getTotalSupplyBNFTResult : ' + getTotalSupplyBNFTResult);

    return getTotalSupplyBNFTResult;
  }

  async getNewCertiTxObject(req): Promise<txObject> {
    let returnResult: txObject;

    // const docName = req.files[0].originalname;
    // const fileHash = await CertificateService.getFileHash(req.files[0].buffer);
    // l.info('docName : ' + docName);
    // l.info('fileHash : ' + fileHash);

    l.info('req.body.from : ' + req.body.from);

    const addressFrom: string = req.body.from;
    const bID: number = req.body.bID;
    const cID: number = req.body.cID;
    const grade: string = req.body.grade;
    const evaluationDate: string = req.body.evaluationDate;
    const evaluationAgency: string = req.body.evaluationAgency;
    const certificateHash: string = req.body.certificateHash;
    // certificateHash: string = fileHash;

    // eslint-disable-next-line prefer-const
    const getNewCertiTxObjectResult = await CertificateService.callGetNewCertiTxObject(
      addressFrom,
      bID,
      cID,
      grade,
      evaluationDate,
      evaluationAgency,
      certificateHash
    );

    // eslint-disable-next-line prefer-const
    returnResult = getNewCertiTxObjectResult;
    l.info('returnResult : ' + JSON.stringify(returnResult));

    return returnResult;
  }

  async getRemoveCertiTxObject(req): Promise<txObject> {
    let returnResult: txObject;

    l.info('req.query.from : ' + req.query.from);

    const addressFrom: string = req.query.from;
    const bID: number = req.query.bID;

    // eslint-disable-next-line prefer-const
    const getRemoveCertiTxObjectResult = await CertificateService.callGetRemoveCertiTxObject(
      addressFrom,
      bID
    );

    // eslint-disable-next-line prefer-const
    returnResult = getRemoveCertiTxObjectResult;
    l.info('returnResult : ' + JSON.stringify(returnResult));

    return returnResult;
  }

  async getCertificateInfo(req): Promise<string> {
    l.info('req.query.bID : ' + req.query.bID);

    const bID: number = req.query.bID;
    const cID: number = req.query.cID;

    // eslint-disable-next-line prefer-const
    const getCertificateInfoResult = await CertificateService.callGetCertificateInfo(
      bID,
      cID
    );

    l.info(
      'getCertificateInfoResult : ' + JSON.stringify(getCertificateInfoResult)
    );

    return getCertificateInfoResult;
  }

  async getCheckLatestCertificate(req): Promise<string> {
    l.info('req.body.bID : ' + req.query.bID);

    const bID: number = req.body.bID;
    const cID: number = req.body.cID;
    const certificateHash: string = req.body.certificateHash;

    // eslint-disable-next-line prefer-const
    const getCheckLatestCertificateResult = await CertificateService.callGetCheckLatestCertificate(
      bID,
      cID,
      certificateHash
    );

    l.info(
      'getCheckLatestCertificateResult : ' + getCheckLatestCertificateResult
    );

    return getCheckLatestCertificateResult;
  }

  async getCheckOldCertificate(req): Promise<string> {
    l.info('req.body.bID : ' + req.body.bID);

    const bID: number = req.body.bID;
    const cID: number = req.body.cID;
    const certificateHash: string = req.body.certificateHash;

    // eslint-disable-next-line prefer-const
    const getCheckOldCertificateResult = await CertificateService.callGetCheckOldCertificate(
      bID,
      cID,
      certificateHash
    );

    l.info('getCheckOldCertificateResult : ' + getCheckOldCertificateResult);

    return getCheckOldCertificateResult;
  }

  async getCertificateCount(req): Promise<string> {
    l.info('req.query.bID : ' + req.query.bID);

    const bID: number = req.query.bID;

    // eslint-disable-next-line prefer-const
    const getCertificateCountResult = await CertificateService.callGetCertificateCount(
      bID
    );

    l.info('getCertificateCountResult : ' + getCertificateCountResult);

    return getCertificateCountResult;
  }

  async getTransferBPTTxObject(req): Promise<txObject> {
    let returnResult: txObject;

    l.info('req.query.from : ' + req.query.from);

    const addressFrom: string = req.query.from;
    const recipient: string = req.query.recipient;
    const amount: number = req.query.amount;

    // eslint-disable-next-line prefer-const
    const getTransferBPTTxObjectResult = await CertificateService.callGetTransferBPTTxObject(
      addressFrom,
      recipient,
      amount
    );

    // eslint-disable-next-line prefer-const
    returnResult = getTransferBPTTxObjectResult;
    l.info('returnResult : ' + JSON.stringify(returnResult));

    return returnResult;
  }

  async getSymbolBPT(req): Promise<string> {
    // eslint-disable-next-line prefer-const
    const getSymbolBPTResult = await CertificateService.callGetSymbolBPT();

    l.info('getSymbolBPTResult : ' + getSymbolBPTResult);

    return getSymbolBPTResult;
  }

  async getTotalSupplyBPT(req): Promise<string> {
    // eslint-disable-next-line prefer-const
    const getTotalSupplyBPTResult = await CertificateService.callGetTotalSupplyBPT();

    l.info('getTotalSupplyBPTResult : ' + getTotalSupplyBPTResult);

    return getTotalSupplyBPTResult;
  }

  async getBalanceOfBPT(req): Promise<string> {
    l.info('req.query.from : ' + req.query.from);

    const addressFrom: string = req.query.from;

    // eslint-disable-next-line prefer-const
    const getBalanceOfBPTResult = await CertificateService.callGetBalanceOfBPT(
      addressFrom
    );

    l.info('getBalanceOfBPTResult : ' + getBalanceOfBPTResult);

    return getBalanceOfBPTResult;
  }
}
export default new Controller();
