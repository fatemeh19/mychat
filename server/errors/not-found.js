import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";
class NotFoundError extends CustomError{
    constructor(message,errors){
        super(message,errors)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export default NotFoundError