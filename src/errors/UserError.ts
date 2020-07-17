// 이미 회원 가입된 이메일로 다시 회원가입을 신청하려고 할 때(409 Conflict)
import { HttpError, NotFoundError } from 'routing-controllers';
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
      message: `Please recheck signed e-mail ${this.userEmail}`,
    };
  }
}

export class UserNotFoundError extends NotFoundError {
  private userEmail: string;
  constructor(userEmail: string) {
    super('User Not Found');
    this.userEmail = userEmail;
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }

  public toJSON(): ErrorResponse {
    return {
      error: this.message,
      message: `Please recheck e-mail or sign up ${this.userEmail} account`,
    };
  }
}

export class DuplicatedInformation extends HttpError {
  private reason: string;
  constructor(reason: string) {
    super(409, 'Duplicated User Information');
    this.reason = reason.split('\n\n')[1];
    Object.setPrototypeOf(this, DuplicatedInformation.prototype);
  }

  public toJSON(): ErrorResponse {
    return {
      error: this.message,
      message: this.reason,
    };
  }
}
// OAuth를 사용할 때 엑세스 토큰(access token)이 유효하지 않을 경우 (403 Forbidden)
