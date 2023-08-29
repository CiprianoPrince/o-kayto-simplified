const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization || request.headers.Authorization;
    // Check if authHeader exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.sendStatus(401); // Unauthorized
    }

    // Extract token from authHeader
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return response.sendStatus(403); // Forbidden due to invalid token
        }
        
        // Assign user information to the request object
        request.userID = decoded.userInfo.userID;
        request.role = decoded.userInfo.role;
        
        next(); // Proceed to the next middleware or route handler
    });
};
