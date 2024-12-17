const {errorResponse} = require('../helpers/responseHelper.js');

const errorHandler = (error, req, res, next) => {
    console.error(error.stack);
    errorResponse(res, 'Internal server error', {errors: error.message}, 500);
}

module.exports = errorHandler