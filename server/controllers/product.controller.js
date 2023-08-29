// Import necessary modules
const db = require('../models');
const { col } = require('sequelize');
const ProductModel = db.Product;
const ProductImageModel = db.ProductImage;
const SizeModel = db.Size;
const ColorModel = db.Color;

const { ValidationError } = require('sequelize');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

// Import helper functions
const sendResponse = require('../helpers/sendResponse');
const generateMessage = require('../helpers/generateMessage');
const getModelName = require('../helpers/getModelName');

// Fetch the model name based on the filename
const modelName = getModelName(__filename);

// Fetch all products
exports.findAll = async (request, response) => {
    try {
        // Fetch all products from the database
        const foundProducts = await ProductModel.findAll({
            attributes: [
                'productID',
                'name',
                'description',
                'price',
                'categoryID',
                [col('ProductImage.imagePath'), 'imagePath'], // Custom alias
                [col('ProductImage.altText'), 'altText'], // Custom alias
                [col('Colors.name'), 'color'],
                [col('Sizes.name'), 'size'],
            ],
            include: [
                {
                    model: ProductImageModel,
                    attributes: [], // Exclude default attributes
                },
                {
                    model: ColorModel,
                    attributes: [],
                },
                {
                    model: SizeModel,
                    attributes: [],
                },
            ],
        });

        // If there are no products, send NO_CONTENT status code
        if (!foundProducts.length) {
            return sendResponse(
                response,
                StatusCodes.NO_CONTENT,
                generateMessage.findAll.missing(modelName)
            );
        }

        // Send fetched products with OK status code
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.findAll.success(modelName, foundProducts.length),
            foundProducts
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error
        }
        console.log(error);
        // Send INTERNAL_SERVER_ERROR status code for other errors
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

// Fetch product by primary key
exports.findByPk = async (request, response) => {
    try {
        // Extract product ID from request params
        const productID = request.params.productID;
        // Fetch the product with the specified ID
        const foundProduct = await ProductModel.findByPk(productID, {
            attributes: [
                'productID',
                'name',
                'description',
                'price',
                'categoryID',
                [col('ProductImage.imagePath'), 'imagePath'], // Custom alias
                [col('ProductImage.altText'), 'altText'], // Custom alias
                [col('Colors.name'), 'color'],
                [col('Sizes.name'), 'size'],
            ],
            include: [
                {
                    model: ProductImageModel,
                    attributes: [], // Exclude default attributes
                },
                {
                    model: ColorModel,
                    attributes: [],
                },
                {
                    model: SizeModel,
                    attributes: [],
                },
            ],
        });

        // If product not found, send BAD_REQUEST status code
        if (!foundProduct) {
            return sendResponse(
                response,
                StatusCodes.BAD_REQUEST,
                generateMessage.findByPk.missingID(modelName, productID)
            );
        }

        // Send fetched product data with OK status code
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.findByPk.success(modelName),
            foundProduct
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error
        }

        // Send INTERNAL_SERVER_ERROR status code for other errors
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

// Create a new product
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
        // Extract variant data from request body
        const productData = request.body;
        const imagePath = request.file.filename;

        const extraData = {
            image: {
                imagePath: imagePath,
                altText: `${productData.name} Image`,
            },
        };

        // Create a new variant for the product
        const dbProductData = await ProductModel.create(productData, {
            extraData: extraData,
        });

        // Send the created product data with OK status code
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.createOne.success(modelName),
            dbProductData
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error
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

// Update a product by primary key
exports.updateOne = async (request, response) => {
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
        // Extract product ID and data from request
        const productID = request.params.productID;
        const rawProductData = request.body;

        // Update the product with the specified ID
        const [affectedRows] = await ProductModel.update(rawProductData, {
            where: { productID },
        });

        // If no rows affected, send BAD_REQUEST status code
        if (!affectedRows) {
            return sendResponse(
                response,
                StatusCodes.BAD_REQUEST,
                generateMessage.updateOne.missingID(modelName)
            );
        }

        // Send affected rows count with OK status code
        sendResponse(response, StatusCodes.OK, generateMessage.updateOne.success(modelName), {
            affectedRows,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error
        }

        // Send INTERNAL_SERVER_ERROR status code for other errors
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

// Delete a product by primary key
exports.deleteOne = async (request, response) => {
    try {
        // Extract product ID from request params
        const productID = request.params.productID;

        // Delete the product with the specified ID
        const deletedRows = await ProductModel.destroy({ where: { productID } });

        // If no rows deleted, send BAD_REQUEST status code
        if (!deletedRows) {
            return sendResponse(
                response,
                StatusCodes.BAD_REQUEST,
                generateMessage.deleteOne.missingID(modelName)
            );
        }

        // Send deleted rows count with OK status code
        sendResponse(response, StatusCodes.OK, generateMessage.deleteOne.success(modelName), {
            deletedRows,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error
        }

        // Send INTERNAL_SERVER_ERROR status code for other errors
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
