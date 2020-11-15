import TransactionService from '../services/transaction.service';
import bizError from '../../common/error/bizError';
import errorCode from '../../common/error/errorCode';
import l from '../../common/logger';
import { TransactionReceipt } from 'web3-core';
import { web3Config } from '../../common/web3';
import crypto from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import bdcCertificateManagerABI from '../../../contract/bdcCertificateManager/BdcCertificateManagerABI.json';
import bdcBPTABI from '../../../contract/bdcBPT/BdcBPTABI.json';

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface txObject {
  nonce: string;
  from: string;
  gas: string;
  gasPrice: string;
  to: string;
  data: string;
}

const addressToBCM = process.env.BDC_CERTIFICATE_MANAGER;
const addressToBBPT = process.env.BDC_BPT;

const web3 = web3Config();

const BCMContract = new web3.eth.Contract(
  bdcCertificateManagerABI,
  addressToBCM
);
const BBPTContract = new web3.eth.Contract(bdcBPTABI, addressToBBPT);

export class CertificateService {
  async getFileHash(buffer): Promise<any> {
    const hash = await crypto
      .createHash('sha256')
      .update(buffer)
      .digest('hex');
    return '0x' + hash;
  }

  async callSendSignedTx(signedData: string): Promise<TransactionReceipt> {
    l.info('signedData : ' + signedData);

    return TransactionService.sendSignedTransaction(signedData);
  }

  async callGetInitBNFTTxObject(
    addressFrom: string,
    name: string,
    symbol: string
  ): Promise<txObject> {
    l.info('addressTo : ' + addressToBCM);
    l.info('addressFrom : ' + addressFrom);
    l.info('name : ' + name);
    l.info('symbol : ' + symbol);

    return web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then(txnCount => {
        // Create the transaction object
        l.info('txnCount: ', web3.utils.numberToHex(txnCount));

        const returnTxObject: txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          from: addressFrom,
          gas: web3.utils.toHex(21000000),
          gasPrice: web3.utils.numberToHex(0),
          to: addressToBCM,

          data: BCMContract.methods.initialize(name, symbol).encodeABI(),
        };
        return returnTxObject;
      });
  }

  async callGetNewBNFTTxObject(
    addressFrom: string,
    bID: number,
    manufacturerName: string,
    modelName: string,
    manufacturerDate: string
  ): Promise<txObject> {
    l.info('addressTo : ' + addressToBCM);
    l.info('addressFrom : ' + addressFrom);
    l.info('bID : ' + bID);
    l.info('manufacturerName : ' + manufacturerName);
    l.info('modelName : ' + modelName);
    l.info('manufacturerDate : ' + manufacturerDate);

    return web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then(txnCount => {
        // Create the transaction object
        l.info('txnCount: ', web3.utils.numberToHex(txnCount));

        const returnTxObject: txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          from: addressFrom,
          gas: web3.utils.toHex(21000000),
          gasPrice: web3.utils.numberToHex(0),
          to: addressToBCM,

          data: BCMContract.methods
            .createBNFT(bID, manufacturerName, modelName, manufacturerDate)
            .encodeABI(),
        };
        return returnTxObject;
      });
  }

  async callGetRemoveBNFTTxObject(
    addressFrom: string,
    bID: number
  ): Promise<txObject> {
    l.info('addressTo : ' + addressToBCM);
    l.info('addressFrom : ' + addressFrom);
    l.info('bID : ' + bID);

    return web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then(txnCount => {
        // Create the transaction object
        l.info('txnCount: ', web3.utils.numberToHex(txnCount));

        const returnTxObject: txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          from: addressFrom,
          gas: web3.utils.toHex(21000000),
          gasPrice: web3.utils.numberToHex(0),
          to: addressToBCM,

          data: BCMContract.methods.deleteBNFT(bID).encodeABI(),
        };
        return returnTxObject;
      });
  }

  async callGetTransferFromBNFTTxObject(
    addressFrom: string,
    transferFrom: string,
    transferTo: string,
    bID: number
  ): Promise<txObject> {
    l.info('addressTo : ' + addressToBCM);
    l.info('addressFrom : ' + addressFrom);
    l.info('transferFrom : ' + transferFrom);
    l.info('transferTo : ' + transferTo);
    l.info('bID : ' + bID);

    return web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then(txnCount => {
        // Create the transaction object
        l.info('txnCount: ', web3.utils.numberToHex(txnCount));

        const returnTxObject: txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          from: addressFrom,
          gas: web3.utils.toHex(21000000),
          gasPrice: web3.utils.numberToHex(0),
          to: addressToBCM,

          data: BCMContract.methods
            .transferFrom(transferFrom, transferTo, bID)
            .encodeABI(),
        };
        return returnTxObject;
      });
  }

  async callGetOwnerOfBNFT(bID: number): Promise<string> {
    l.info('addressTo : ' + addressToBCM);
    l.info('bID : ' + bID);

    return BCMContract.methods.ownerOf(bID).call();
  }

  async callGetTokenURIBNFT(bID: number): Promise<string> {
    l.info('addressTo : ' + addressToBCM);
    l.info('bID : ' + bID);

    return BCMContract.methods.tokenURI(bID).call();
  }

  async callGetTotalSupplyBNFT(): Promise<string> {
    l.info('addressTo : ' + addressToBCM);

    return BCMContract.methods.totalSupply().call();
  }

  async callGetNewCertiTxObject(
    addressFrom: string,
    bID: number,
    cID: number,
    grade: string,
    evaluationDate: string,
    evaluationAgency: string,
    certificateHash: string
  ): Promise<txObject> {
    l.info('addressTo : ' + addressToBCM);
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
          gas: web3.utils.toHex(21000000),
          gasPrice: web3.utils.numberToHex(0),
          to: addressToBCM,

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

  async callGetRemoveCertiTxObject(
    addressFrom: string,
    bID: number
  ): Promise<txObject> {
    l.info('addressTo : ' + addressToBCM);
    l.info('addressFrom : ' + addressFrom);
    l.info('bID : ' + bID);

    return web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then(txnCount => {
        // Create the transaction object
        l.info('txnCount: ', web3.utils.numberToHex(txnCount));

        const returnTxObject: txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          from: addressFrom,
          gas: web3.utils.toHex(21000000),
          gasPrice: web3.utils.numberToHex(0),
          to: addressToBCM,

          data: BCMContract.methods.deleteAllCertificate(bID).encodeABI(),
        };
        return returnTxObject;
      });
  }

  async callGetCertificateInfo(bID: number, cID: number): Promise<string> {
    l.info('addressTo : ' + addressToBCM);
    l.info('bID : ' + bID);
    l.info('cID : ' + cID);

    return BCMContract.methods.certificateInfo(bID, cID).call();
  }

  async callGetCheckLatestCertificate(
    bID: number,
    cID: number,
    certificateHash: string
  ): Promise<string> {
    l.info('addressTo : ' + addressToBCM);
    l.info('bID : ' + bID);
    l.info('cID : ' + cID);
    l.info('certificateHash : ' + certificateHash);

    return BCMContract.methods
      .checkLatestCertificate(bID, cID, certificateHash)
      .call();
  }

  async callGetCheckOldCertificate(
    bID: number,
    cID: number,
    certificateHash: string
  ): Promise<string> {
    l.info('addressTo : ' + addressToBCM);
    l.info('bID : ' + bID);
    l.info('cID : ' + cID);
    l.info('certificateHash : ' + certificateHash);

    return BCMContract.methods
      .checkOldCertificate(bID, cID, certificateHash)
      .call();
  }

  async callGetCertificateCount(bID: number): Promise<string> {
    l.info('addressTo : ' + addressToBCM);
    l.info('bID : ' + bID);

    return BCMContract.methods.getcertificateCount(bID).call();
  }

  async callGetInitBPTTxObject(
    addressFrom: string,
    name: string,
    symbol: string,
    decimals: number,
    initialSupply: number,
    initialHolder: string
  ): Promise<txObject> {
    l.info('addressTo : ' + addressToBBPT);
    l.info('name : ' + name);
    l.info('symbol : ' + symbol);
    l.info('decimals : ' + decimals);
    l.info('initialSupply : ' + initialSupply);
    l.info('initialHolder : ' + initialHolder);

    return web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then(txnCount => {
        // Create the transaction object
        l.info('txnCount: ', web3.utils.numberToHex(txnCount));

        const returnTxObject: txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          from: addressFrom,
          gas: web3.utils.toHex(21000000),
          gasPrice: web3.utils.numberToHex(0),
          to: addressToBBPT,

          data: BBPTContract.methods
            .initialize(name, symbol, decimals, initialSupply, initialHolder)
            .encodeABI(),
        };
        return returnTxObject;
      });
  }

  async callGetTransferBPTTxObject(
    addressFrom: string,
    recipient: string,
    amount: number
  ): Promise<txObject> {
    l.info('addressTo : ' + addressToBBPT);
    l.info('recipient : ' + recipient);
    l.info('amount : ' + amount);

    return web3.eth
      .getTransactionCount(addressFrom, 'pending')
      .then(txnCount => {
        // Create the transaction object
        l.info('txnCount: ', web3.utils.numberToHex(txnCount));

        const returnTxObject: txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          from: addressFrom,
          gas: web3.utils.toHex(21000000),
          gasPrice: web3.utils.numberToHex(0),
          to: addressToBBPT,

          data: BBPTContract.methods.transfer(recipient, amount).encodeABI(),
        };
        return returnTxObject;
      });
  }

  async callGetSymbolBPT(): Promise<string> {
    l.info('addressTo : ' + addressToBBPT);

    return BBPTContract.methods.symbol().call();
  }

  async callGetTotalSupplyBPT(): Promise<string> {
    l.info('addressTo : ' + addressToBBPT);

    return BBPTContract.methods.totalSupply().call();
  }

  async callGetBalanceOfBPT(addressFrom: string): Promise<string> {
    l.info('addressTo : ' + addressToBBPT);
    l.info('addressFrom : ' + addressFrom);

    return BBPTContract.methods.balanceOf(addressFrom).call();
  }
}
export default new CertificateService();
