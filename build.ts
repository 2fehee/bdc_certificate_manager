import s from 'shelljs';
const config = require('./tsconfig.json');
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
s.cp('-r', `./public`, `${outDir}`);
s.mkdir('-p', `${outDir}/server/common/openapi`);
s.cp(
  'server/common/openapi/api.yml',
  `${outDir}/server/common/openapi/api.yml`
);
s.mkdir('-p', `${outDir}/contract/bdcCertificateManager/build/`);
s.cp(
  'contract/bdcCertificateManager/build/bdcCertificateManager.json',
  `${outDir}/contract/bdcCertificateManager/build/bdcCertificateManager.json`
);
s.mkdir('-p', `${outDir}/contract/bdcCertificateManager/contracts/`);
s.cp(
  'contract/bdcCertificateManager/contracts/bdcCertificateManager.sol',
  `${outDir}/contract/bdcCertificateManager/contracts/bdcCertificateManager.sol`
);
s.mkdir('-p', `${outDir}/contract/bdcBPT/build/`);
s.cp(
  'contract/bdcBPT/build/BdcBPT.json',
  `${outDir}/contract/bdcBPT/build/BdcBPT.json`
);
s.mkdir('-p', `${outDir}/contract/bdcBPT/contracts/`);
s.cp(
  'contract/bdcBPT/contracts/BdcBPT.sol',
  `${outDir}/contract/bdcBPT/contracts/BdcBPT.sol`
);
