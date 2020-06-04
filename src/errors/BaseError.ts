export interface ErrorResponse {
  error: string;
  message: string;
}

export class BaseError extends Error {
  /*
  constructor(name?: string, message?: string) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
  */
}