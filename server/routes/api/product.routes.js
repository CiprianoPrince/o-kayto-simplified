const ROLELIST = require('../../constant/ROLELIST');

module.exports = (app) => {
    const multer = require('../../middleware/multer/productMulter.middleware');
    const verifyRoles = require('../../middleware/verifyRoles.middleware');
    const ROLELIST = require('../../constant/ROLELIST');
    const controller = require('../../controllers/product.controller');
    const validator = require('../../validators/product.validator');
    const router = require('express').Router();

    // Retrieve all products.
    router.get('/', verifyRoles(ROLELIST.Admin, ROLELIST.User, ROLELIST.Guest), controller.findAll);

    //  Retrieve details of a specific product.
    router.get(
        '/:productID',
        verifyRoles(ROLELIST.Admin, ROLELIST.User, ROLELIST.Guest),
        controller.findByPk
    );

    // Add a new product.
    router.post(
        '/',
        verifyRoles(ROLELIST.Admin),
        multer.single('productImage'),
        validator.validateName,
        validator.validateDescription,
        validator.validatePrice,
        validator.validateCategoryID,
        validator.validateSizeID,
        validator.validateColorID,
        controller.createOne
    );

    //  Update a product's details.
    router.put(
        '/:productID',
        verifyRoles(ROLELIST.Admin),
        multer.single('productImage'),
        validator.validateName,
        validator.validateDescription,
        validator.validatePrice,
        validator.validateCategoryID,
        validator.validateSizeID,
        validator.validateColorID,
        controller.updateOne
    );

    //  Delete a product.
    router.delete('/:productID', verifyRoles(ROLELIST.Admin), controller.deleteOne);

    app.use('/api/products', router);
};
