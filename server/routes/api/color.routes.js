module.exports = (app) => {
    const verifyRoles = require('../../middleware/verifyRoles.middleware');
    const ROLELIST = require('../../constant/ROLELIST');
    const controller = require('../../controllers/color.controller');
    const validator = require('../../validators/color.validator');

    const router = require('express').Router();

    // Retrieve all colors.
    router.get('/', verifyRoles(ROLELIST.Admin, ROLELIST.User), controller.findAll);

    //  Retrieve a specific color.
    router.get('/:colorID', verifyRoles(ROLELIST.Admin, ROLELIST.User), controller.findByPk);

    // Place a new color.
    router.post('/', verifyRoles(ROLELIST.Admin), validator.validateName, controller.createOne);

    // Update color details/status.
    router.put(
        '/:colorID',
        verifyRoles(ROLELIST.Admin),
        validator.validateName,
        controller.updateOne
    );

    // Cancel an color.
    router.delete('/:colorID', verifyRoles(ROLELIST.Admin), controller.deleteOne);

    // POST /colors/{colorId}/payments - Make a payment for an color.
    app.use('/api/colors', router);
};
