import { UnauthorizedError } from 'routing-controllers';
import { ErrorResponse } from '../errors/BaseError';

export class JwtValidateError extends UnauthorizedError {}

export class PasswordIncorrectError extends UnauthorizedError {
  constructor() {
    super('Incorrect Password');
    Object.setPrototypeOf(this, PasswordIncorrectError.prototype);
  }

  public toJSON(): ErrorResponse {
    return {
      error: this.message,
      message: 'Please recheck your password',
    };
  }
}
