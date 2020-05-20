/*class ResponseHelper {
  public static transformError(err: any) {
    let statusCode = 500
    let message = '예상치 못한 에러가 발생하였습니다.'
    if (err instanceof HttpError) {
      statusCode = err.statusCode
      message = err.message
    } else if (err instanceof CustomError) {
      statusCode = 422
      message = err.message || '어쨋든 클라이언트 잘못임'
    } else if (...) { ... }
    else {
      // 어떤 에러인지 파악이 안되는 경우
      throw err
    }
    return { statusCode, message }
  }
}
*/
