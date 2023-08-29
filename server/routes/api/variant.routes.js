module.exports = (app) => {
    const multer = require('../../middleware/multer/variantMulter.middleware');
    const verifyRoles = require('../../middleware/verifyRoles.middleware');
    const ROLELIST = require('../../constant/ROLELIST');
    const controller = require('../../controllers/variant.controller');
    const validator = require('../../validators/variant.validator');

    const router = require('express').Router();

    // Retrieve all product variants.
    router.get(
        '/:productID/variants',
        verifyRoles(ROLELIST.Admin, ROLELIST.User, ROLELIST.Guest),
        controller.findAll
    );

    //  Retrieve details of a specific product variant.
    router.get(
        '/:productID/variants/:variantID',
        verifyRoles(ROLELIST.Admin, ROLELIST.User),
        controller.findByPk
    );

    // Add a new product variant.
    router.post(
        '/:productID/variants',
        verifyRoles(ROLELIST.Admin),
        multer.single('variantImage'),
        validator.validateSizeID,
        validator.validateColorID,
        validator.validateQuantityInStock,
        validator.validateReOrderThreshold,
        validator.validateLastRestockDate,
        controller.createOne
    );

    //  Update a product variant's  details.
    router.put(
        '/:productID/variants/:variantID',
        verifyRoles(ROLELIST.Admin),
        multer.single('variantImage'),
        validator.validateSizeID,
        validator.validateColorID,
        validator.validateQuantityInStock,
        validator.validateReOrderThreshold,
        validator.validateLastRestockDate,
        controller.updateOne
    );

    //  Delete a product.
    router.delete(
        '/:productID/variants/:variantID',
        verifyRoles(ROLELIST.Admin),
        controller.deleteOne
    );

    app.use('/api/products', router);
};
