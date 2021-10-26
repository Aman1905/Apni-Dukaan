class ErrorHandler extends Error {
    // here extends means that we have inherited the ErrorHandler from Error

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler