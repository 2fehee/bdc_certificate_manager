import TransactionService from '../services/transaction.service';
import bizError from '../../common/error/bizError';
import errorCode from '../../common/error/errorCode';
import l from '../../common/logger';
import { TransactionReceipt } from 'web3-core';
import { web3Config } from '../../common/web3';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import bdcCertificateManagerABI from '../../../contract/bdcCertificateManager/bdcCertificateManagerABI.json';

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface txObject {
  nonce: string;
  from: string;
  gas: string;
  gasPrice: string;
  to: string;
  data: string;
}

const addressTo = process.env.BDC_CERTIFICATE_MANAGER;

const web3 = web3Config();

const BCMContract = new web3.eth.Contract(bdcCertificateManagerABI, addressTo);

export class CertificateService {

  async callNewCertificate(signedData: string): Promise<TransactionReceipt> {
    l.info('signedData : ' + signedData);

    return TransactionService.sendSignedTransaction(signedData);
  }

  async callGetNewInfo(
    addressFrom: string,
    bID: string,
    cID: string,
    grade: string,
    evaluationDate: string,
    evaluationAgency: string,
    certificateHash: string
  ): Promise<txObject> {
    l.info('addressTo : ' + addressTo);
    l.info('addressFrom : ' + addressFrom);
    l.info('bID : ' + bID);
    l.info('cID : ' + cID);
    l.info('grade : ' + grade);
    l.info('evaluationDate : ' + evaluationDate);
    l.info('evaluationAgency : ' + evaluationAgency);
    l.info('certificateHash : ' + certificateHash);


    return web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then(txnCount => {
        // Create the transaction object
        l.info('txnCount: ', web3.utils.numberToHex(txnCount));

        const returnTxObject: txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          from: addressFrom,
          gas: web3.utils.toHex(1237312),
          gasPrice: web3.utils.numberToHex(0),
          to: addressTo,

          data: BCMContract.methods
            .createCertificate(
              bID,
              cID,
              grade,
              evaluationDate,
              evaluationAgency,
              certificateHash
            )
            .encodeABI(),
        };
        return returnTxObject;
      });
  }

  async callGetCertificateInfo(bID: string, cID: string): Promise<string> {
    l.info('addressTo : ' + addressTo);
    l.info('bID : ' + bID);
    l.info('cID : ' + cID);

    return BCMContract.methods.certificateInfo(bID, cID).call();
  }

  async callGetCheckLatestCertificate(
    bID: string,
    cID: string,
    certificateHash: string
  ): Promise<string> {
    l.info('addressTo : ' + addressTo);
    l.info('bID : ' + bID);
    l.info('cID : ' + cID);
    l.info('certificateHash : ' + certificateHash);

    return BCMContract.methods
      .checkLatestCertificate(bID, cID, certificateHash)
      .call();
  }

  async callGetCheckOldCertificate(
    bID: string,
    cID: string,
    certificateHash: string
  ): Promise<string> {
    l.info('addressTo : ' + addressTo);
    l.info('bID : ' + bID);
    l.info('cID : ' + cID);
    l.info('certificateHash : ' + certificateHash);

    return BCMContract.methods
      .checkOldCertificate(bID, cID, certificateHash)
      .call();
  }

  async callGetCertificateCount(bID: string): Promise<string> {
    l.info('addressTo : ' + addressTo);
    l.info('bID : ' + bID);

    return BCMContract.methods.getcertificateCount(bID).call();
  }

}
export default new CertificateService();
