const { loginPostController, signupPostController, sendEmailVerificationMail, refreshClientSession } = require("../Controller/authController");
const AuthMiddleWare = require("../Middleware/authMiddleware");
const { placeholderController, lateResponse } = require("../Util/placeholder");
const AuthValidator = require("../Validator/authValidator");

const authRouter = require("express").Router();

authRouter.post("/login", loginPostController);
authRouter.post("/signup", AuthValidator.signUpValidator, signupPostController);
authRouter.post("/verify-email/:verificationId/:verificationCode", AuthMiddleWare.isLoggedIn, placeholderController);
authRouter.post("/reset-password/:userId", placeholderController);
authRouter.get("/is-logged-in", placeholderController);
authRouter.delete("/logout", placeholderController);
authRouter.post("/send-verification-email", sendEmailVerificationMail);
authRouter.get("/refresh-client-session", refreshClientSession);

module.exports = authRouter;
