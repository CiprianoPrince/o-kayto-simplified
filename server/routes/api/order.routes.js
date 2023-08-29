module.exports = (app) => {
    const controller = require('../../controllers/order.controller');
    const validator = require('../validators/order.validator');

    const router = require('express').Router();

    // Retrieve all orders.
    router.get('/', controller.findAll);

    //  Retrieve a specific order.
    router.get('/:orderID', controller.findByPk);

    // Place a new order.
    router.post('/', controller.createOne);

    // Update order details/status.
    router.put('/:orderID', controller.updateOne);

    // Cancel an order.
    router.delete('/:orderID', controller.deleteOne);

    // POST /orders/{orderId}/payments - Make a payment for an order.
    app.use('/api/orders', router);
};
