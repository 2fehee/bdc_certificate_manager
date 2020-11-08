import Web3 from 'web3';
import EthTx from 'ethereumjs-tx';
import l from './logger';

function setJwtToken(): object {
  let httpOptions;
  if (process.env.BESU_CONNECTION_TOKEN != '') {
    httpOptions = {
      headers: [
        {
          name: 'Authorization',
          value: 'Bearer ' + process.env.BESU_CONNECTION_TOKEN,
        },
      ],
    };
  }
  return httpOptions;
}

function setWebSocketJwtToken(): object {
  let wsOptions;
  if (process.env.BESU_CONNECTION_TOKEN != '') {
    wsOptions = {
      headers: {
        authorization: 'Bearer ' + process.env.BESU_CONNECTION_TOKEN,
      },
    };
  }
  return wsOptions;
}

function web3Config() {
  const provider = process.env.BESU_CONNECTION_URL;
  let web3;
  if (process.env.BESU_CONNECTION_URL.includes('wss')) {
    web3 = new Web3(
      new Web3.providers.WebsocketProvider(provider, setWebSocketJwtToken())
    );
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider(provider, setJwtToken()));
  }
  web3.eth.transactionConfirmationBlocks = 1;
  return web3;
}

function getRawTxHex(txObject: object, privateKey: Buffer): string {
  const tx = new EthTx(txObject);
  tx.sign(privateKey);
  const serializedTx = tx.serialize();
  return `0x${serializedTx.toString('hex')}`;
}

async function syncWeb3Network(): Promise<void> {
  const provider = process.env.BESU_CONNECTION_URL;
  let web3;
  if (process.env.BESU_CONNECTION_URL.includes('wss')) {
    web3 = new Web3(
      new Web3.providers.WebsocketProvider(provider, setWebSocketJwtToken())
    );
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider(provider, setJwtToken()));
  }
  await web3.eth.net
    .isListening()
    .then(() => l.info('Besu connection has been established successfully.'))
    .catch(e => l.error(`Web3 connection has problem. : ${e.message}`));
}

export { web3Config, getRawTxHex, syncWeb3Network };
