const ROLELIST = require('../constant/ROLELIST');

module.exports = (...allowedRoles) => {
    return (request, response, next) => {
        if (allowedRoles.includes(ROLELIST.Guest)) return next();
        const currentRole = request?.role;
        if (!currentRole) return response.sendStatus(401);

        if (!allowedRoles.includes(currentRole)) return response.sendStatus(401);
        next();
    };
};
