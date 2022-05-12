require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/UserModel");

/**
 *
 * @param {Object} user
 * @returns {Promise<jwt>}
 */
exports.jwtSignForUser = (user) => {
    const userForSign = {
        username: user.username,
        email: user.email,
        _id: user._id,
    };

    return new Promise((resolve, reject) => {
        jwt.sign(userForSign, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 }, function (err, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

exports.verifyUserJwtToken = (token, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const userFound = await UserModel.findOne({ _id: data._id, email: data.email, username: data.username });
            userFound.password = undefined;
            if (!userFound) reject(new Error("User doesn't found for this Token"));
            else resolve({ success: true, message: "token is extreme", user: userFound });
        } catch (error) {
            reject(error);
        }
    });
};
