const { StatusCodes } = require('http-status-codes')
const BadRequestError = require('./BadRequest')
class ValidationError extends BadRequestError{
    constructor(message, errors){
        super(message, errors)
        this.statusCode = StatusCodes.BAD_REQUEST
        
    }
}

module.exports = ValidationError