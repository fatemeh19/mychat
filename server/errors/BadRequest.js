import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";
class BadRequestError extends CustomError {
  constructor(message, errors) {
    super(message, errors);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError
