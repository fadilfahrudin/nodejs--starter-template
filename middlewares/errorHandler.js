const { errorResponse } = require('../helpers/responseHelper.js');

const errorHandler = (error, req, res, next) => {
    console.error(error.stack);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error'
    errorResponse(res, message, error || null, statusCode);
}

module.exports = errorHandler