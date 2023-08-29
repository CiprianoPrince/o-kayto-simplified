module.exports = (app) => {
    const controller = require('../controllers/refreshTokenController');

    const router = require('express').Router();

    router.get('/', controller.handleRefreshToken);

    app.use('/refresh', router);
};
