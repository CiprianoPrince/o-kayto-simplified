module.exports = (app) => {
    const controller = require('../controllers/registerController');

    const router = require('express').Router();

    router.post('/', controller.handleNewUser);

    app.use('/register', router);
};
