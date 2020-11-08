export default function responseTemplate(result?: any, errorResponse?: any) {
  return {
    success: !errorResponse,
    result,
    errorResponse,
  };
}
