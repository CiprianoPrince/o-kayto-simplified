module.exports = (app) => {
    const tutorials = require('../controllers/tutorial.controller');

    const router = require('express').Router();

    router.post('/', tutorials.create);

    router.get('/', tutorials.findAll);

    router.get('/:id', tutorials.findOne);

    router.get('/:id', tutorials.update);

    router.put('/', tutorials.deleteAll);

    router.delete('/:id', tutorials.deleteOne);

    app.use('/api/tutorials', router);
};
