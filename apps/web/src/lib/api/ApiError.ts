export default class ApiError extends Error {
  public errorCode: string;

  constructor(message: string, errorCode: string) {
    super(message);
    this.errorCode = errorCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
