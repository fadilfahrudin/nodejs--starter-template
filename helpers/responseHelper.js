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
        errors
    })
}

module.exports = {
    successResponse,
    errorResponse
}