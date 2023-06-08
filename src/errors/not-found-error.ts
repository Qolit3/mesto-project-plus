class NotFoundError extends Error {

  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundError;