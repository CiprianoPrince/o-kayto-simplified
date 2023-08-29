const db = require('../models');
const ReviewModel = db.Review;

const { ValidationError } = require('sequelize');

const { validationResult } = require('express-validator');

const { StatusCodes } = require('http-status-codes');

const sendResponse = require('../helpers/sendResponse');
const generateMessage = require('../helpers/generateMessage');
const getModelName = require('../helpers/getModelName');

const modelName = getModelName(__filename);

exports.findAll = async (request, response) => {
    try {
        const reviews = await ReviewModel.findAll();
        if (!reviews.length) {
            return sendResponse(
                response,
                StatusCodes.NO_CONTENT,
                generateMessage.findAll.missing(modelName)
            );
        }

        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.findAll.success(modelName, reviews.length),
            reviews
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // handle validation error
        }

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

exports.findByPk = async (request, response) => {
    try {
        const reviewID = request.params.reviewID;
        const dbReviewData = await ReviewModel.findByPk(reviewID);
        if (!dbReviewData) {
            return sendResponse(
                response,
                StatusCodes.BAD_REQUEST,
                generateMessage.findByPk.missingID(modelName, reviewID)
            );
        }
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.findByPk.success(modelName),
            dbReviewData
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // handle validation error
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

exports.createOne = async (request, response) => {
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
        const rawReviewData = request.body;
        const dbReviewData = await ReviewModel.create(rawReviewData);
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.createOne.success(modelName),
            dbReviewData
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // handle validation error
        }
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
        const reviewID = request.params.reviewID;
        const rawReviewData = request.body;

        const [affectedRows] = await ReviewModel.update(rawReviewData, {
            where: { reviewID },
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
            // handle validation error
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

exports.deleteOne = async (request, response) => {
    try {
        const reviewID = request.params.reviewID;

        const deletedRows = await ReviewModel.destroy({ where: { reviewID } });
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
            // handle validation error
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
