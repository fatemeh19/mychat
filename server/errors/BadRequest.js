import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";
class BadRequestError extends CustomError {
  constructor(errorTypeDetail,field) {
    super('Bad Request Error!',errorTypeDetail,field)
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError
