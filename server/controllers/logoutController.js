const db = require('../models');
const UserModel = db.User;
const RefreshTokenModel = db.RefreshToken;

// exports.handleLogout = async (req, res) => {
//     // On client, also delete the accessToken

//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(204); //No content
//     const existingToken = cookies.jwt;

//     // Is refreshToken in db?
//     const foundUser = await UserModel.findOne({
//         include: {
//             model: RefreshTokenModel,
//             where: {
//                 token: existingToken,
//             },
//         },
//     });

//     if (!foundUser) {
//         res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//         return res.sendStatus(204);
//     }

//     // Delete refreshToken in db
//     RefreshTokenModel.dsetroy({ where: { token: existingToken } });

//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//     res.sendStatus(204);
// };

exports.handleLogout = async (req, res) => {
    // Extract JWT token from the cookies
    const existingToken = req.cookies?.jwt;

    // If no JWT, return immediately
    if (!existingToken) return res.sendStatus(204);

    try {
        // Find user with the corresponding refreshToken
        const foundUser = await UserModel.findOne({
            include: {
                model: RefreshTokenModel,
                where: { token: existingToken },
            },
        });

        // If a user with the refreshToken is found, delete the token
        if (foundUser) {
            await RefreshTokenModel.destroy({ where: { token: existingToken } });
        }

        // Clear the JWT cookie
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('Internal Server Error');
    }
};
