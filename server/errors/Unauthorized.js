import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";
class UnauthorizedError extends CustomError{
    constructor(message, errors){
        super(message, errors)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

export default UnauthorizedError