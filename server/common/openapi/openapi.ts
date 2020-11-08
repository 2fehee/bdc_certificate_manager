import * as path from 'path';
import express, { Application } from 'express';
import errorHandler from '../../api/middlewares/error.handler';
import errorLogHandler from '../../api/middlewares/error.log.handler';
import { OpenApiValidator } from 'express-openapi-validator';
import { readSync, writeSync } from 'node-yaml';

function makeYaml(): void {
  const apiYaml = readSync(path.join(__dirname, 'api.yml'), {
    encode: 'utf-8',
  });
  apiYaml.servers = [];
  apiYaml.servers.push({ url: process.env.APP_CONTEXT_PATH });
  apiYaml.info.title = process.env.APP_ID;
  apiYaml.info.version = process.env.APP_VERSION;
  if (process.env.TOKEN_ENDPOINT) {
    apiYaml.components.securitySchemes.OAuth2.flows.clientCredentials.tokenUrl =
      process.env.TOKEN_ENDPOINT;
  }
  writeSync(path.join(__dirname, 'api.yml'), apiYaml);
}

export default async function(
  app: Application,
  routes: (app: Application) => void
): Promise<void> {
  makeYaml();
  const apiSpec = path.join(__dirname, 'api.yml');
  const validateResponses = !!(
    process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
    process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
  );
  return new OpenApiValidator({
    apiSpec,
    validateResponses,
  })
    .install(app)
    .then(() => {
      if (process.env.SWAGGER_ENABLE === 'true') {
        app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpec));
      }
      routes(app);
      app.use(errorLogHandler);
      app.use(errorHandler);
    });
}
