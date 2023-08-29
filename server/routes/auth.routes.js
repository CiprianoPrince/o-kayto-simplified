module.exports = (app) => {
    const controller = require('../controllers/authController');

    const router = require('express').Router();

    router.post('/', controller.handleLogin);

    app.use('/auth', router);
};
