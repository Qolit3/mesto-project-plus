class FailedAuthorization extends Error {

  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HTTP_CODES.UNAUTHORIZED;
  }
}

module.exports = FailedAuthorization;