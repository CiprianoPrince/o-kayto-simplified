const db = require('../models');
const UserModel = db.User;
const bcrypt = require('bcrypt');

const { ValidationError } = require('sequelize');

const { validationResult } = require('express-validator');

const { StatusCodes } = require('http-status-codes');

const sendResponse = require('../helpers/sendResponse');
const generateMessage = require('../helpers/generateMessage');

// exports.handleNewUser = async (req, res) => {
//     const { user, pwd } = req.body;
//     if (!user || !pwd)
//         return res.status(400).json({ message: 'Username and password are required.' });

//     // check for duplicate usernames in the db
//     const duplicate = await UserModel.findOne({ username: user }).exec();
//     if (duplicate) return res.sendStatus(409); //Conflict

//     try {
//         //encrypt the password
//         const hashedPwd = await bcrypt.hash(pwd, 10);

//         //create and store the new user
//         const result = await User.create({
//             username: user,
//             password: hashedPwd,
//         });

//         console.log(result);

//         res.status(201).json({ success: `New user ${user} created!` });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.handleNewUser = async (request, response) => {
    try {
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

        const rawUserData = request.body;

        const hashedPwd = await bcrypt.hash(rawUserData?.password, 10);
        rawUserData.password = hashedPwd;

        const dbUserData = await UserModel.create(rawUserData, { role: 'Admin' });
        sendResponse(
            response,
            StatusCodes.OK,
            generateMessage.createOne.success('User'),
            dbUserData
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            // handle validation error
        }
        sendResponse(
            response,
            StatusCodes.INTERNAL_SERVER_ERROR,
            generateMessage.createOne.failure('User'),
            null,
            error,
            'ERR9001'
        );
    }
};
