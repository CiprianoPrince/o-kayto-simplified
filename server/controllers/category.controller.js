// Importing necessary modules
const db = require('../models');
const CategoryModel = db.Category;
const { ValidationError } = require('sequelize');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

// Importing helper functions
const sendResponse = require('../helpers/sendResponse');
const generateMessage = require('../helpers/generateMessage');
const getModelName = require('../helpers/getModelName');

// Fetching the model name based on the filename
const modelName = getModelName(__filename);

// Fetch all categories
exports.findAll = async (request, response) => {
    try {
        const categories = await CategoryModel.findAll();
        
        // If there are no categories, send NO_CONTENT status code
        if (!categories.length) {
            return sendResponse(
                response,
                StatusCodes.NO_CONTENT,
                generateMessage.findAll.missing(modelName)
            );
        }

        // Send fetched categories with OK status code
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.findAll.success(modelName, categories.length),
            categories
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error (currently not handling, but can be expanded)
        }
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

// Fetch category by primary key
exports.findByPk = async (request, response) => {
    try {
        const categoryID = request.params.categoryID;
        const dbCategoryData = await CategoryModel.findByPk(categoryID);
        
        // If category not found, send BAD_REQUEST status code
        if (!dbCategoryData) {
            return sendResponse(
                response,
                StatusCodes.BAD_REQUEST,
                generateMessage.findByPk.missingID(modelName, categoryID)
            );
        }
        
        // Send fetched category data with OK status code
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.findByPk.success(modelName),
            dbCategoryData
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error (currently not handling, but can be expanded)
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

// Create a new category
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
        const rawCategoryData = request.body;
        const dbCategoryData = await CategoryModel.create(rawCategoryData);
        
        // Send created category data with OK status code
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.createOne.success(modelName),
            dbCategoryData
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation error (currently not handling, but can be expanded)
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

// Update a category by primary key
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
        const categoryID = request.params.categoryID;
        const rawCategoryData = request.body;

        // Update the category data
        const [affectedRows] = await CategoryModel.update(rawCategoryData, {
            where: { categoryID },
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
            // Handle validation error (currently not handling, but can be expanded)
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

// Delete a category by primary key
exports.deleteOne = async (request, response) => {
    try {
        const categoryID = request.params.categoryID;

        // Delete the category
        const deletedRows = await CategoryModel.destroy({ where: { categoryID } });
        
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
            // Handle validation error (currently not handling, but can be expanded)
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
