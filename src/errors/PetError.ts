// 이미 회원 가입된 이메일로 다시 회원가입을 신청하려고 할 때(409 Conflict)
import { HttpError } from 'routing-controllers';
import { NotFoundError } from 'routing-controllers';
import { ErrorResponse } from '../errors/BaseError';

export class NotRegisteredPetError extends NotFoundError {
  constructor() {
    super('Not Registerd Pet');
    Object.setPrototypeOf(this, NotRegisteredPetError.prototype);
  }

  public toJSON(): ErrorResponse {
    return {
      error: this.message,
      message: 'Please recheck your pet register number,',
    };
  }
}

export class DuplicatedPetNameError extends HttpError {
  constructor() {
    super(409, 'Duplicated pet name');
    Object.setPrototypeOf(this, DuplicatedPetNameError.prototype);
  }

  public toJSON(): ErrorResponse {
    return {
      error: this.message,
      message: 'Duplicated pet name is not allowed in same user',
    };
  }
}
