import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";
class UnauthorizedError extends CustomError {
  constructor(errorTypeDetail, field) {
    super("Unauthorized Error!", errorTypeDetail, field);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;
