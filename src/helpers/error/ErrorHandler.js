export class ErrorHandler extends Error {
  constructor(status, message, controller) {
    super(message);
    this.status = status;
    this.message = message;
    this.controller = controller;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorHandler);
    }
  }
}
