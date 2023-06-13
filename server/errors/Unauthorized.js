const { StatusCodes } = require('http-status-codes')
const CustomError = require('./CustomError')
class UnauthorizedError extends CustomError{
    constructor(message, errors){
        super(message, errors)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = UnauthorizedError