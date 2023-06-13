const { StatusCodes } = require('http-status-codes')
const CustomError = require('./CustomError')
class NotFoundError extends CustomError{
    constructor(message,errors){
        super(message,errors)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError