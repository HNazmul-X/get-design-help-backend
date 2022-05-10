const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const UserModel = require("../Model/UserModel");
const MyEmailServer = require("../Util/MyEmailServer");
const crypto = require("crypto");
const VerificationModel = require("../Model/VerificationModel");
const { jwtSignForUser } = require("../Util/jwtSignForUser");

exports.loginPostController = async (req, res, next) => {
    try {
        const { usernameOrEmail, password } = req.body;

        /* Check Login Validation with User Credentials */
        const checkUserCredentials = async (user, inputPassword) => {
            const isPasswordMatch = await bcrypt.compare(inputPassword, user.password);
            if (!isPasswordMatch) {
                res.json({ error: true, message: "Invalid User Credentials" });
            } else {
                user.password = undefined;
                const token = await jwtSignForUser(user);
                res.json({ success: true, token: token, user: user });
            }
        };

        const userFoundWithUsername = await UserModel.findOne({ username: usernameOrEmail });
        if (userFoundWithUsername) {
            checkUserCredentials(userFoundWithUsername, password);
        } else {
            const userFoundWithEmail = await UserModel.findOne({ email: usernameOrEmail });
            if (userFoundWithEmail) {
                checkUserCredentials(userFoundWithEmail, password);
            } else res.json({ error: true, message: "User Doesn't Exist" });
        }
    } catch (e) {
        next(e);
    }
};

exports.signupPostController = async (req, res, next) => {
    try {
        console.log(req.body);
        const { username, password, email } = req.body;
        const dataError = validationResult(req).formatWith((e) => e.msg);
        if (!dataError.isEmpty()) {
            res.json({ error: true, ...dataError.mapped() });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const createdUser = await new UserModel({ username, password: hashedPassword, email }).save();
            createdUser.password = undefined;
            const token = await jwtSignForUser(createdUser);
            res.json({ success: true, token: token, user: createdUser });
        }
    } catch (e) {
        next(e);
    }
};

exports.sendEmailVerificationMail = async (req, res, next) => {
    try {
        const code = crypto.randomBytes(100).toString("base64url");
        const verificationData = await new VerificationModel({ code, user: req.user?._id || null, isUsed: false }).save();
        const link = `verify-email?code=${encodeURIComponent(code)}&&verificationId=${encodeURIComponent(verificationData._id)}&&userId=${req.user._id}`;
        const emailResult = await MyEmailServer.emailSentWithNazmul_Sarlex_org({
            to: "nazmul.w3@gmail.com",
            subject: "Verification Code for Nazmul.w3@gmail.com",
            html: `
                <h1> here is your Verification Link .. </h1>
                <p> just click this Link <a href="http://localhost:3000/${link}">http://localhost:3000/${link}</a> </p>
            `,
        });
        res.json(emailResult);
    } catch (e) {
        next(e);
    }
};

exports.logoutController = async (req, res, next) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                next(error);
            }
        });
        return res.json({ success: "logged Out Successfully" });
    } catch (e) {
        next(e);
    }
};

exports.verifySignupEmail = async (req, res, next) => {
    try {
        const { code, verificationId, userId } = req.query;
        const verificationData = await VerificationModel.findOne({ _id: verificationId }).populate("User", "_id");

        if (!verificationData || verificationData.isUsed === true) return res.json({ error: "Sorry, Verification Session Expired" });
        if (!verificationData.code === code || verificationData.user._id === userId) return res.json({ error: "Invalid Verification Url" });

        await VerificationModel.findByIdAndUpdate(verificationId, {
            isUsed: true,
        });
        return res.json({ success: "verification Successfully" });
    } catch (e) {
        next(e);
    }
};

exports.isLoggedInController = async (req, res, next) => {
    try {
        if (!req.session.isLoggedIn) {
            return res.json({ error: "you are not LoggedIn", isLoggedIn: false });
        } else {
            const userData = UserModel.findById(req.session.user._id);
            res.json({ isLoggedIn: true, user: userData });
        }
    } catch (e) {
        next(e);
    }
};
