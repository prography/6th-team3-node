import { ErrorResponse } from '../errors/BaseError';
import { BadRequestError, InternalServerError } from 'routing-controllers';

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

export class UploadImageError extends InternalServerError {
  constructor() {
    super('Upload Image Error');
    Object.setPrototypeOf(this, UploadImageError.prototype);
  }
  public toJSON(): ErrorResponse {
    return {
      error: this.message,
      message: 'Error occured during upload image file on server',
    };
  }
}

export class ImageSizeError extends BadRequestError {
  constructor() {
    super('Image Size Error');
    Object.setPrototypeOf(this, ImageSizeError.prototype);
  }
  public toJSON(): ErrorResponse {
    return {
      error: this.message,
      message: 'Image too large, you can upload files up to 1MB',
    };
  }
}
