import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";
class NotFoundError extends CustomError{
    constructor(message,errors){
        super(message,errors)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError