const { StatusCodes } = require('http-status-codes')
const CustomError = require('./CustomError')
class BadRequestError extends CustomError{
    constructor(message,  type, field){
        super(message,  type, field)
        this.statusCode = StatusCodes.BAD_REQUEST
        
    }
}

module.exports = BadRequestError