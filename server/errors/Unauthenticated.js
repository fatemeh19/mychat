import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";
class UnauthenticatedError extends CustomError{
    constructor(errorTypeDetail,field){
        super('Unauthenticated Error!',errorTypeDetail,field)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnauthenticatedError