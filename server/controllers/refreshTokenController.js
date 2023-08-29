const db = require('../models');
const UserModel = db.User;
const RefreshTokenModel = db.RefreshToken;
const jwt = require('jsonwebtoken');

// exports.handleRefreshToken = async (req, res) => {
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(401);

//     const existingToken = cookies.jwt;

//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

//     const foundUser = await UserModel.findOne({
//         include: {
//             model: RefreshTokenModel,
//             where: {
//                 token: existingToken,
//             },
//         },
//     });

//     // Detected refresh token reuse!
//     if (!foundUser) {
//         jwt.verify(existingToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
//             if (err) return res.sendStatus(403); //Forbidden
//             console.log('attempted refresh token reuse!');
//             await RefreshTokenModel.destroy({ where: { userID: decoded.userID } });
//         });
//         return res.sendStatus(403); //Forbidden
//     }

//     await RefreshTokenModel.destroy({ where: { token: existingToken } });

//     // evaluate jwt
//     jwt.verify(existingToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
//         if (err) {
//             console.log('expired refresh token');
//         }

//         if (err || foundUser.userID !== decoded.userID) return res.sendStatus(403);

//         // Refresh token was still valid
//         const role = await foundUser.getProfile().role;
//         const accessToken = jwt.sign(
//             {
//                 UserInfo: {
//                     userID: decoded.userID,
//                     role: role,
//                 },
//             },
//             process.env.ACCESS_TOKEN,
//             { expiresIn: '10s' }
//         );

//         const refreshToken = jwt.sign({ userID: foundUser.userID }, process.env.REFRESH_TOKEN, {
//             expiresIn: '1m',
//         });

//         // Saving refreshToken with current user
//         await foundUser.createRefreshToken({ token: refreshToken });

//         // Creates Secure Cookie with refresh token
//         res.cookie('jwt', refreshToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'None',
//             maxAge: 24 * 60 * 60 * 1000,
//         });

//         res.json({ accessToken });
//     });
// };

exports.handleRefreshToken = async (req, res) => {
    // Extract JWT token from the cookies
    const existingToken = req.cookies?.jwt;
    console.log(existingToken);

    // If no JWT token is present in the cookies, return a 401 Unauthorized status
    if (!existingToken) return res.sendStatus(401);

    // Clear the JWT cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    // Fetch the user associated with the given refresh token
    const foundUser = await UserModel.findOne({
        include: {
            model: RefreshTokenModel,
            where: {
                token: existingToken,
            },
        },
    });

    // If the user is not found, this might indicate an attempted refresh token reuse
    if (!foundUser) {
        jwt.verify(existingToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
            // If there's an error in verifying the JWT or if the user ID doesn't match, return a 403 Forbidden status
            if (err) return res.sendStatus(403);

            // Log attempted reuse and delete the refresh token from the database
            console.log('attempted refresh token reuse!');
            await RefreshTokenModel.destroy({ where: { userID: decoded.userID } });
        });
        return res.sendStatus(403); //Forbidden
    }

    // Delete the existing refresh token from the database
    await RefreshTokenModel.destroy({ where: { token: existingToken } });

    // Verify the JWT with the refresh token secret
    jwt.verify(existingToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
        // If there's an error in verifying the JWT or if the user ID doesn't match, return a 403 Forbidden status
        if (err || foundUser.userID !== decoded.userID) {
            if (err) console.log('expired refresh token');
            return res.sendStatus(403);
        }

        // // Fetch the user role
        // const foundUserRole = await foundUser.getProfile().role;
        // const role = ROLELIST[foundUserRole];

        // Create a new access token
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    userID: decoded.userID,
                    role: decoded.role,
                },
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: '1d' }
        );

        // Create a new refresh token
        const refreshToken = jwt.sign(
            { userID: decoded.userID, role: decoded.role },
            process.env.REFRESH_TOKEN,
            {
                expiresIn: '1d',
            }
        );

        // Save the new refresh token in the database
        await foundUser.createRefreshToken({ token: refreshToken });

        // Set the new refresh token as a secure cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Return the new access token in the response
        res.json({ accessToken });
    });
};
