import EthTx = require('ethereumjs-tx');
import { web3Config } from '../../common/web3';
const web3 = web3Config();
import { Account } from 'web3-core';

export class UtilService {
  async sign(privateKey: string, signingData: object): Promise<string> {
    console.log('signingData: ' + JSON.stringify(signingData));

    const privKey = Buffer.from(privateKey, 'hex');
    const tx = new EthTx(signingData);
    tx.sign(privKey);

    const serializedTx = tx.serialize(undefined);
    const rawTxHex = '0x' + serializedTx.toString('hex');

    console.log('Raw transaction data: ' + rawTxHex);
    return rawTxHex;
  }

  createAccountKeyPair(): Account {
    const createAccountEntropy = 'secret';
    return web3.eth.accounts.create(createAccountEntropy);
  }
}
export default new UtilService();
