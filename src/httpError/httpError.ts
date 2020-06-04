import { HttpError } from 'routing-controllers';

//400번 에러
export class BadRequestError extends HttpError {
  name = 'BadRequestError';

  constructor(message?: string) {
    super(400);
    Object.setPrototypeOf(this, BadRequestError.prototype);

    if (message) this.message = message;
  }
}
//404 에러
export class NotFoundError extends HttpError {
  name = 'NotFoundError';

  constructor(message?: string) {
    super(404);
    Object.setPrototypeOf(this, NotFoundError.prototype);

    if (message) this.message = message;
  }
}
//500번 에러
export class InternalServerError extends HttpError {
  name = 'InternalServerError';

  constructor(message: string) {
    super(500);
    Object.setPrototypeOf(this, InternalServerError.prototype);

    if (message) this.message = message;
  }
}
