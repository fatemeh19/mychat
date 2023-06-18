import { StatusCodes } from "http-status-codes";
import BadRequestError from "./BadRequest.js";
class ValidationError extends BadRequestError{
    constructor(message, errors){
        super(message, errors)
        this.statusCode = StatusCodes.BAD_REQUEST
        
    }
}

export default ValidationError