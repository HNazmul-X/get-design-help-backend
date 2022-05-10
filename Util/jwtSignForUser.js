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
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
            if (err) {
                reject(err);
            } else {
                const userFound = await UserModel.findOne({ _id: decoded._id, email: decoded.email, username: decoded.username });
                if (!userFound) reject(new Error("User doesn't found for this Token"));
                else resolve({ success: true, message: "token is extreme",user:userFound });
            }
        });
    });
};
