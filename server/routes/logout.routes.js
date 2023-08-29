module.exports = (app) => {
    const controller = require('../controllers/logoutController');

    const router = require('express').Router();

    router.get('/', controller.handleLogout);

    app.use('/logout', router);
};
