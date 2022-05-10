const UserModel = require("../Model/UserModel");

module.exports = class AuthMiddleWare {
    static isLoggedIn = (req, res, next) => {
        if (req.session.isLoggedIn) {
            next();
        } else {
            res.json({ error: "you are not logged In" });
        }
    };

    static bindUserWithRequest = () => {
        return async (req, res, next) => {
            if (!req.session.isLoggedIn) {
                return next();
            } else {
                try {
                    const userData = UserModel.findById(req.session.user._id);
                    req.user = userData;
                    return next();
                } catch (e) {
                    next(e);
                }
            }
        };
    };
};
