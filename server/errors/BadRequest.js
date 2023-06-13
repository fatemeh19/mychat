const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");
class BadRequestError extends CustomError {
  constructor(message, errors) {
    super(message, errors);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
