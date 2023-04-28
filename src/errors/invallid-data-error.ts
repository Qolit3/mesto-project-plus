class InvalidDataError extends Error {

  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_CODES.INVALID_DATA;
  }
}

module.exports = InvalidDataError;