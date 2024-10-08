export default class BadRequestException extends Error {
  constructor(message, errorMessage, statusCode = 400) {
    super(message);
    this.message = message;
    this.errorMessage = errorMessage;
    this.status = statusCode;
  }
}
