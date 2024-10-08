// ValidationException.js
export default class ValidationException extends Error {
  constructor(message = "Data tidak dapat diproses", errors, statusCode = 422) {
    super(message);
    this.message = message;
    this.errors = errors;
    this.statusCode = statusCode;
  }
}
