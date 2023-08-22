import { StatusCodes } from "http-status-codes";
import BadRequestError from "./BadRequest.js";
class ValidationError extends Error{
    constructor(errors){
        super('Validation Error!')
        this.errors = errors
        this.statusCode = StatusCodes.BAD_REQUEST
        
    }
    // set errors(errors){
    //     this.errors = errors
    // }
}

export default ValidationError