
class CustomError extends Error{
    constructor(message,errors){
        super(message)
        this.errors = errors
       
    }
}

module.exports = CustomError