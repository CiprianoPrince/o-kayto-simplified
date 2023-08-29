module.exports = (app) => {
    const verifyRoles = require('../../middleware/verifyRoles.middleware');
    const ROLELIST = require('../../constant/ROLELIST');
    const controller = require('../../controllers/category.controller');
    const validator = require('../../validators/category.validator');

    const router = require('express').Router();

    // Retrieve all category.
    router.get('/', verifyRoles(ROLELIST.Admin, ROLELIST.User), controller.findAll);

    //  Retrieve details of a specific category.
    router.get('/:categoryID', verifyRoles(ROLELIST.Admin, ROLELIST.User), controller.findByPk);

    // Add a new category.
    router.post(
        '/',
        verifyRoles(ROLELIST.Admin),
        validator.validateName,
        validator.validateDescription,
        controller.createOne
    );

    //  Update a category's details.
    router.put(
        '/:categoryID',
        validator.validateName,
        validator.validateDescription,
        controller.updateOne
    );

    //  Delete a category.
    router.delete('/:categoryID', controller.deleteOne);

    app.use('/api/categories', router);
};
