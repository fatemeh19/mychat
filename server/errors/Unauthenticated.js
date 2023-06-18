import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";
class UnauthenticatedError extends CustomError{
    constructor(message,errors){
        super(message,errors)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnauthenticatedError