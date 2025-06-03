class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = !statusCode ? 500 : statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
