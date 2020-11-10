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

var upload = multer({
  storage: multer.memoryStorage()
}).single('uploadDocument');

export class Controller {

  async getNewInfo(req): Promise<txObject> {
    let returnResult: txObject;

    //const docName = req.files[0].originalname;
    //const fileHash = await CertificateService.getFileHash(req.files[0].buffer);
    //l.info('docName : ' + docName);
    //l.info('fileHash : ' + fileHash);

    l.info('req.query.from : ' + req.query.from);

    const addressFrom: string = req.query.from;
    const bID: string = req.query.bID;
    const cID: string = req.query.cID;
    const grade: string = req.query.grade;
    const evaluationDate: string = req.query.evaluationDate;
    const evaluationAgency: string = req.query.evaluationAgency;
    const certificateHash: string = req.query.certificateHash;
    //const certificateHash: string = fileHash;

    // eslint-disable-next-line prefer-const
    const getNewInfoResult = await CertificateService.callGetNewInfo(
      addressFrom,
      bID,
      cID,
      grade,
      evaluationDate,
      evaluationAgency,
      certificateHash
    );

    // eslint-disable-next-line prefer-const
    returnResult = getNewInfoResult;
    l.info('returnResult : ' + JSON.stringify(returnResult));

    return returnResult;
  }

  async newCertificate(req: Request, res: Response): Promise<string> {
    const { signedData } = req.body;
    l.info('signedData : ' + signedData);

    // eslint-disable-next-line prefer-const
    const receipt = await CertificateService.callNewCertificate(signedData);

    l.info('returnReceipt : ' + JSON.stringify(receipt));

    const transactionHash = JSON.stringify(receipt.transactionHash);

    return transactionHash;
  }

  async getCertificateInfo(req): Promise<string> {
    l.info('req.query.bID : ' + req.query.bID);

    const bID: string = req.query.bID;
    const cID: string = req.query.cID;

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
    l.info('req.query.bID : ' + req.query.bID);

    const bID: string = req.query.bID;
    const cID: string = req.query.cID;
    const certificateHash: string = req.query.certificateHash;

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
    l.info('req.query.bID : ' + req.query.bID);

    const bID: string = req.query.bID;
    const cID: string = req.query.cID;
    const certificateHash: string = req.query.certificateHash;

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

    const bID: string = req.query.bID;

    // eslint-disable-next-line prefer-const
    const getCertificateCountResult = await CertificateService.callGetCertificateCount(
      bID
    );

    l.info('getCertificateCountResult : ' + getCertificateCountResult);

    return getCertificateCountResult;
  }

}
export default new Controller();
