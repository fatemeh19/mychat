const CustomError = require('./CustomError')
const NotFoundError = require('./not-found')
const UnauthenticatedError = require('./Unauthenticated')
const UnauthorizedError = require('./Unauthorized')
const BadRequestError = require('./BadRequest')

module.exports ={
    CustomError,
    NotFoundError,
    UnauthenticatedError,
    UnauthorizedError,
    BadRequestError
}