import L from '../../common/logger';
import { web3Config } from '../../common/web3';
import { TransactionReceipt } from 'web3-core';

const web3 = web3Config();

export class TransactionService {
  sendSignedTransaction(signedData: string): Promise<TransactionReceipt> {
    L.info(`rawTxHex ${signedData}`);

    // sendSignedTransaction 호출하여 sign 결과 값 besu에 전달
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return web3.eth
      .sendSignedTransaction(signedData)
      .on('receipt', function(receipt) {
        L.info('******************************************');
        L.info('Receipt: ', receipt);
      })
      .catch(error => {
        L.info('Error: ', error.message);
      });
  }
}

export default new TransactionService();
