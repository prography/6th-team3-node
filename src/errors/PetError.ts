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
