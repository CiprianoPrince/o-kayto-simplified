module.exports = (app) => {
    const controller = require('../../controllers/review.controller');
    const validator = require('../../validators/review.validator');

    const router = require('express').Router();

    // Retrieve all reviews.
    router.get('/', controller.findAll);

    // Retrieve a specific review.
    router.get('/:reviewID', controller.findByPk);

    // Add a new review.
    router.post('/', controller.createOne);

    // Update a review.
    router.put('/:reviewID', controller.updateOne);

    // Delete a review.
    router.delete('/:reviewID', controller.deleteOne);

    app.use('/api/reviews', router);
};
