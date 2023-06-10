
class CustomError extends Error{
    constructor(message, type, field){
        super(message)
        this.type = type
        this.field = field
    }
}

module.exports = CustomError