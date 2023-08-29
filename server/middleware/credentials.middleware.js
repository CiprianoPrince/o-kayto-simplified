const allowedOrigins = require('../config/allowedOrigins');

module.exports = (request, response, next) => {
    const { origin } = request.headers;

    if (origin && allowedOrigins.includes(origin)) {
        response.header('Access-Control-Allow-Credentials', true);
    }
    next();
};
