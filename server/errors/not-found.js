import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";
class NotFoundError extends CustomError{
    constructor(errorTypeDetail,field){
        super('Not Found Error!',errorTypeDetail,field)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export default NotFoundError