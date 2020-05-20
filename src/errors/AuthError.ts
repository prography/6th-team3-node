export class KaKaoAuthError extends Error {
  constructor(name?: string, message?: string) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
