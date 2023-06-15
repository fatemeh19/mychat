const { StatusCodes } = require('http-status-codes')
const CustomError = require('./CustomError')
class UnauthenticatedError extends CustomError{
    constructor(message,errors){
        super(message,errors)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError