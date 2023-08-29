// Importing necessary modules
const db = require('../models');
const ColorModel = db.Color;
const { ValidationError } = require('sequelize');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

// Importing helper functions
const sendResponse = require('../helpers/sendResponse');
const generateMessage = require('../helpers/generateMessage');
const getModelName = require('../helpers/getModelName');

// Fetching the model name based on the filename
const modelName = getModelName(__filename);

// Fetch all colors
exports.findAll = async (request, response) => {
    try {
        const colors = await ColorModel.findAll();

        // If there are no colors, send NO_CONTENT status code
        if (!colors.length) {
            return sendResponse(
                response,
                StatusCodes.NO_CONTENT,
                generateMessage.findAll.missing(modelName)
            );
        }

        // Send fetched colors with OK status code
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.findAll.success(modelName, colors.length),
            colors
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

// Fetch color by primary key
exports.findByPk = async (request, response) => {
    try {
        const colorID = request.params.colorID;
        const dbColorData = await ColorModel.findByPk(colorID);

        // If color not found, send BAD_REQUEST status code
        if (!dbColorData) {
            return sendResponse(
                response,
                StatusCodes.BAD_REQUEST,
                generateMessage.findByPk.missingID(modelName, colorID)
            );
        }

        // Send fetched color data with OK status code
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.findByPk.success(modelName),
            dbColorData
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

// Create a new color
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
        const rawColorData = request.body;
        const dbColorData = await ColorModel.create(rawColorData);

        // Send created color data with OK status code
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.createOne.success(modelName),
            dbColorData
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

// Update a color by primary key
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
        const colorID = request.params.colorID;
        const rawColorData = request.body;

        // Update the color data
        const [affectedRows] = await ColorModel.update(rawColorData, {
            where: { colorID },
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

// Delete a color by primary key
exports.deleteOne = async (request, response) => {
    try {
        const colorID = request.params.colorID;

        // Delete the color
        const deletedRows = await ColorModel.destroy({ where: { colorID } });

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
