// 이미 회원 가입된 이메일로 다시 회원가입을 신청하려고 할 때(409 Conflict)
import { HttpError } from 'routing-controllers';
import { ErrorResponse } from '../errors/BaseError';

export class AlreadySignedUserError extends HttpError {
  private userEmail: string;
  constructor(userEmail: string) {
    super(409, 'Already Signed User');
    this.userEmail = userEmail;
    Object.setPrototypeOf(this, AlreadySignedUserError.prototype);
  }

  public toJSON(): ErrorResponse {
    return {
      error: this.message,
      message: `Please Recheck signed e-mail ${this.userEmail}`,
    };
  }
}
// OAuth를 사용할 때 엑세스 토큰(access token)이 유효하지 않을 경우 (403 Forbidden)
