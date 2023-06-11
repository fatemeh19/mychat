const { StatusCodes } = require('http-status-codes')
const CustomError = require('./CustomError')
class NotFoundError extends CustomError{
    constructor(message,  type, field){
        super(message, type, field)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError