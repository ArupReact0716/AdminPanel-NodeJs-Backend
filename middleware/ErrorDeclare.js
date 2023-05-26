import ErrorHandler from "../utils/ErrorHandler.js";

const error = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal error"

    const orginal = err
    // wrong mongodb ValidationError error
    if (err.name === "ValidationError") {
        const message = `Resource not found. ValidationError`
        err = new ErrorHandler(message,400)
    }
    // wrong mongodb ValidationError error
    if (err.name === "MongoServerError") {
        const message = `Resource not found. E11000`
        err = new ErrorHandler(message,400)
    }
    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).send({ success: false, message: err.message, orginal: orginal.stack})
}
export default error