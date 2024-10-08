import {
  messageErrorDataNotFound,
  messageErrorShow,
} from "../helpers/message.js";

export default class NotfoundException extends Error {
  constructor(
    message = messageErrorShow,
    errorMessage = messageErrorDataNotFound,
    statusCode = 404
  ) {
    super(message);
    this.message = message;
    this.errorMessage = errorMessage;
    this.code = statusCode;
  }
}
