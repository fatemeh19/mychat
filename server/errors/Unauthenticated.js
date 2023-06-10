const { StatusCodes } = require('http-status-codes')
const CustomError = require('./CustomError')
class UnauthenticatedError extends CustomError{
    constructor(message,  type, field){
        super(message, type, field)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError