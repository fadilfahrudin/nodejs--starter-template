const successResponse = (res, msg, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        status: 'success',
        message: msg,
        data
    })
}

const errorResponse = (res, msg, errors = null, statusCode = 400) => {
    return res.status(statusCode).json({
        status: 'error',
        message: msg,
        error: process.env.NODE_ENV === "production" ? undefined : errors.stack,
    })
}

module.exports = {
    successResponse,
    errorResponse
}