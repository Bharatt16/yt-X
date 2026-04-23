// This file is used to create a custom error class that can be used to throw errors in the application. It extends the built-in Error class and adds additional properties like statusCode, data, message, success, errors and stack.
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something Went wrong",
        errors = [],
        stack = ''
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null 
        this.message = message 
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this , this.constructor) //it is used to capture the stack trace of the error and assign it to the statck property of the error object. It is used to get the stack trace of the error when it is thrown.
            //stack trace is a string that contains the information about the error and the line number where the error occurred. It is used to debug the error and find the root cause of the error.
        }
    }
}
export{ApiError}