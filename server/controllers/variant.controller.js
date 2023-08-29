// Import necessary modules
const db = require('../models');
const ProductModel = db.Product;
const ProductVariantModel = db.ProductVariant;
const VariantModel = db.Variant;
const SizeModel = db.Size;
const ColorModel = db.Color;
const VariantImageModel = db.VariantImage;
const InventoryModel = db.Inventory;

const { ValidationError } = require('sequelize');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

// Import helper functions
const sendResponse = require('../helpers/sendResponse');
const generateMessage = require('../helpers/generateMessage');
const getModelName = require('../helpers/getModelName');
const deleteImageSync = require('../helpers/deleteImageSync');

// Fetch the model name based on the filename
const modelName = getModelName(__filename);

// Fetch all variant
exports.findAll = async (request, response) => {
    try {
        // const variants = await ProductVariantModel.findAll();
        const productID = request.params.productID;

        const foundVariants = await ProductVariantModel.findAll({
            where: { productID },
            attributes: ['productID', 'variantID'],
            include: [
                {
                    model: SizeModel,
                    attributes: ['sizeID', 'name'],
                },
                {
                    model: ColorModel,
                    attributes: ['colorID', 'name'],
                },
                {
                    model: VariantModel,
                    include: [
                        {
                            model: VariantImageModel,
                            attributes: ['imagePath', 'altText'],
                        },
                        {
                            model: InventoryModel,
                            attributes: ['quantityInStock'],
                        },
                    ],
                },
            ],
        });

        if (!foundVariants.length) {
            return sendResponse(
                response,
                StatusCodes.NO_CONTENT,
                generateMessage.findAll.missing(modelName)
            );
        }

        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.findAll.success(modelName, foundVariants.length),
            foundVariants
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error
        }
        console.log(error);
        sendResponse(
            response,
            StatusCodes.INTERNAL_SERVER_ERROR,
            generateMessage.findAll.failure(modelName),
            null,
            error,
            'ERR9001'
        );
    }
};

// Fetch variant by primary key
exports.findByPk = async (request, response) => {
    try {
        const variantID = request.params.variantID;
        const dbVariantData = await VariantModel.findByPk(variantID);

        if (!dbVariantData) {
            return sendResponse(
                response,
                StatusCodes.BAD_REQUEST,
                generateMessage.findByPk.missingID(modelName, variantID)
            );
        }

        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.findByPk.success(modelName),
            dbVariantData
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error
        }

        sendResponse(
            response,
            StatusCodes.INTERNAL_SERVER_ERROR,
            generateMessage.findByPk.failure(modelName),
            null,
            error,
            'ERR9001'
        );
    }
};

// Add a variant to a product
exports.createOne = async (request, response) => {
    // Validate the request data
    const errors = validationResult(request);

    // If validation errors exist, send BAD_REQUEST status code
    if (!errors.isEmpty()) {
        return sendResponse(
            response,
            StatusCodes.BAD_REQUEST,
            generateMessage.all.emptyData(),
            null,
            errors.array()
        );
    }

    try {
        // Extract product ID from request params
        const productID = request.params.productID;

        // Check if product exists
        const foundProduct = await ProductModel.findByPk(productID);

        if (!foundProduct) {
            return sendResponse(
                response,
                StatusCodes.NOT_FOUND,
                generateMessage.findByPk.missingID('Product', productID)
            );
        }

        // Extract variant data from request body
        const { sizeID, colorID, quantityInStock } = request.body;
        const imagePath = request.file.filename;

        const variantData = {
            productID,
        };

        const extraData = {
            sizeID,
            colorID,
            inventory: {
                quantityInStock,
                reOrderThreshold: request.body.reOrderThreshold ?? 50,
                lastRestockDate: request.body.lastRestockDate ?? new Date().toISOString(),
            },
            image: {
                imagePath: imagePath,
                altText: imagePath,
            },
        };

        // Create a new variant for the product
        const createdVariant = await VariantModel.create(variantData, {
            extraData: extraData,
        });

        // Send the created variant data with CREATED status code
        sendResponse(
            response,
            StatusCodes.CREATED,
            generateMessage.createOne.success(modelName),
            createdVariant
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error
            return sendResponse(
                response,
                StatusCodes.BAD_REQUEST,
                generateMessage.all.validationError(),
                null,
                error.errors
            );
        }

        // Send INTERNAL_SERVER_ERROR status code for other errors
        sendResponse(
            response,
            StatusCodes.INTERNAL_SERVER_ERROR,
            generateMessage.createOne.failure(modelName),
            null,
            error,
            'ERR9001'
        );
    }
};

// Update a variant by primary key
exports.updateOne = async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return sendResponse(
            response,
            StatusCodes.BAD_REQUEST,
            generateMessage.all.emptyData(),
            null,
            errors.array()
        );
    }

    try {
        const variantID = request.params.variantID;
        const rawVariantData = request.body;

        // Get associated image(s) for the variant
        const variantWithImages = await VariantModel.findOne({
            where: { variantID },
            include: [ImageModel],
        });

        if (variantWithImages) {
            const foundImage = variantWithImages.Image;

            // Delete image from the directory
            await deleteImageSync(foundImage.imagePath);
        }

        const [affectedRows] = await VariantModel.update(rawVariantData, {
            where: { variantID },
        });

        if (!affectedRows) {
            return sendResponse(
                response,
                StatusCodes.BAD_REQUEST,
                generateMessage.updateOne.missingID(modelName)
            );
        }

        sendResponse(response, StatusCodes.OK, generateMessage.updateOne.success(modelName), {
            affectedRows,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error
        }

        sendResponse(
            response,
            StatusCodes.INTERNAL_SERVER_ERROR,
            generateMessage.updateOne.failure(modelName),
            null,
            error,
            'ERR9001'
        );
    }
};

// Delete a variant by primary key
exports.deleteOne = async (request, response) => {
    try {
        const variantID = request.params.variantID;

        // Get associated image(s) for the variant
        const variantWithImages = await VariantModel.findOne({
            where: { variantID },
            include: [ImageModel],
        });

        if (variantWithImages) {
            const foundImage = variantWithImages.Image;

            // Delete image from the directory
            await deleteImageSync(foundImage.imagePath);
        }

        const deletedRows = await VariantModel.destroy({ where: { variantID } });

        if (!deletedRows) {
            return sendResponse(
                response,
                StatusCodes.BAD_REQUEST,
                generateMessage.deleteOne.missingID(modelName)
            );
        }

        sendResponse(response, StatusCodes.OK, generateMessage.deleteOne.success(modelName), {
            deletedRows,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error
        }

        sendResponse(
            response,
            StatusCodes.INTERNAL_SERVER_ERROR,
            generateMessage.deleteOne.failure(modelName),
            null,
            error,
            'ERR9001'
        );
    }
};
