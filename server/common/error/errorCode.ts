export interface ErrorCode {
  eCode: number;
  eMessage: string;
  statusCode: number;
}

//need to convert enum
export default {
  INVALID_REQUEST: {
    eCode: 40000,
    eMessage: '잘못된 요청입니다.',
    statusCode: 400,
  },
  AUTHORIZATION_ERROR: {
    eCode: 40100,
    eMessage: '인증 오류입니다.',
    statusCode: 401,
  },
  FORBIDDEN: { eCode: 40300, eMessage: '권한 오류입니다.', statusCode: 403 },
  NOT_FOUND: { eCode: 40400, eMessage: '데이터가 없습니다.', statusCode: 404 },

  TRANSACTION_FAILED: {
    eCode: 55000,
    eMessage: 'Transaction 처리 실패',
    statusCode: 500,
  },
  QUERY_FAILED: {
    eCode: 55001,
    eMessage: 'Query 처리 실패',
    statusCode: 500,
  },
  BESU_DISCONNECTED_ERROR: {
    eCode: 59000,
    eMessage: 'Besu connection was closed',
    statusCode: 500,
  },
  UNKNOWN_ERROR: {
    eCode: 50000,
    eMessage: '서버 오류입니다.',
    statusCode: 500,
  },
  DUPLICATED_ID: {
    eCode: 56000,
    eMessage: 'ID 값이 중복됩니다.',
    statusCode: 500,
  },
  DB_ERROR: {
    eCode: 57000,
    eMessage: 'DB 처리 에러',
    statusCode: 500,
  },
};
