const { StatusCodes } = require('http-status-codes')
class ValidationError extends Error{
    constructor(message, errors){
        super(message)
        this.errors = errors
        this.statusCode = StatusCodes.BAD_REQUEST
        
    }
}

module.exports = ValidationError