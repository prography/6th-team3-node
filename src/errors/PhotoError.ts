import { ErrorResponse } from '../errors/BaseError';
import { BadRequestError } from 'routing-controllers';

export class NotSupportedTypeError extends BadRequestError {
  private mimeType: string;
  constructor(mimeType: string) {
    super('Not Supported Mime Type');
    this.mimeType = mimeType;
    Object.setPrototypeOf(this, NotSupportedTypeError.prototype);
  }

  public toJSON(): ErrorResponse {
    return {
      error: this.message,
      message: `${this.mimeType} is not supported image file format`,
    };
  }
}
