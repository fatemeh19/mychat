const { StatusCodes } = require('http-status-codes')
const CustomError = require('./CustomError')
class UnauthorizedError extends CustomError{
    constructor(message,  type, field){
        super(message, type, field)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = UnauthorizedError