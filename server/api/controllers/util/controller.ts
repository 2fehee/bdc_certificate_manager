import UtilService from '../../services/util.service';
import { Request } from 'express';
import { Account } from 'web3-core';

export class Controller {
  async sign(req: Request): Promise<string> {
    const { privateKey, signingData } = req.body;
    return UtilService.sign(privateKey, signingData);
  }

  generateAccountKeyPair(): Account {
    return UtilService.createAccountKeyPair();
  }
}
export default new Controller();
