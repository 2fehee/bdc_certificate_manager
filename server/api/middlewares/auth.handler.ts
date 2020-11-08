import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
import jwksClient, { RsaSigningKey } from 'jwks-rsa';
import l from '../../common/logger';
import BizError from '../../common/error/bizError';
import ErrorCode from '../../common/error/errorCode';
import { Request, Response, NextFunction } from 'express';
import { AuthRole, AuthClientScope } from '../../common/type/AuthTypes';

const client = jwksClient({
  cache: true,
  jwksUri: process.env.AUTH_JWK_URI,
});

function _getKey(header: JwtHeader, callback: SigningKeyCallback): void {
  client.getSigningKey(header.kid, (err: Error, key: RsaSigningKey): void => {
    try {
      const signingKey = key.getPublicKey() || key.rsaPublicKey;
      callback(null, signingKey);
    } catch (e) {
      callback(new Error('Failed to find publicKey for kid'), null);
    }
  });
}

function auth(
  role: string,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    let token = req.headers.authorization; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }
    // token does not exist
    if (!token) {
      //throw new BizError(ErrorCode.AUTHORIZATION_ERROR);
    }
    return jwt.verify(token, _getKey, (err: Error, decoded: Decoded): void => {
      l.info('decoded : ', decoded);
      try {
        if (err) {
          throw new BizError(
            ErrorCode.AUTHORIZATION_ERROR,
            '인증 token에 대한 verify 실패입니다.'
          );
        }
        if (decoded.authorities.includes(role)) {
          // @ts-ignore
          req.decoded = decoded;
          if (decoded['scope'].includes(AuthClientScope.CLIENT_SCOPE)) {
            if (decoded['provider-code'])
              // @ts-ignore
              req.providerCode = decoded['provider-code'];
            return next();
          }
          throw new BizError(
            ErrorCode.AUTHORIZATION_ERROR,
            `Clinet Scope(${AuthClientScope.CLIENT_SCOPE})에 해당하지 않습니다.`
          );
        }
        throw new BizError(
          ErrorCode.AUTHORIZATION_ERROR,
          `Client Role(${role})이 헤당하지 않습니다.`
        );
      } catch (ex) {
        if (ex instanceof BizError) {
          return next(ex);
        }
        return next(new BizError(ErrorCode.AUTHORIZATION_ERROR));
      }
    });
  } catch (ex) {
    if (ex instanceof BizError) {
      return next(ex);
    }
    return next(new BizError(ErrorCode.AUTHORIZATION_ERROR));
  }
}

const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const role = AuthRole.AUTH_ROLE_NAME_ADMIN;
  return auth(role, req, res, next);
};

const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const role = AuthRole.AUTH_ROLE_NAME_USER;
  return auth(role, req, res, next);
};

const providerAuth = (req: Request, res: Response, next: NextFunction) => {
  const role = AuthRole.AUTH_ROLE_NAME_PROVIDER;
  return auth(role, req, res, next);
};

interface Decoded {
  authorities: Array<string>;
}

export { adminAuth, userAuth, providerAuth };
