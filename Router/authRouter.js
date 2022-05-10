const { loginPostController, signupPostController, sendEmailVerificationMail } = require("../Controller/authController");
const AuthMiddleWare = require("../Middleware/authMiddleware");
const { placeholderController, lateResponse } = require("../Util/placeholder");
const AuthValidator = require("../Validator/authValidator");

const authRouter = require("express").Router();

authRouter.post("/login",lateResponse, loginPostController );
authRouter.post("/signup", AuthValidator.signUpValidator,lateResponse,signupPostController);
authRouter.post("/verify-email/:verificationId/:verificationCode",AuthMiddleWare.isLoggedIn,placeholderController)
authRouter.post("/reset-password/:userId",placeholderController)
authRouter.get("/is-logged-in",placeholderController)
authRouter.delete("/logout",placeholderController)
authRouter.post("/send-verification-email",sendEmailVerificationMail)



module.exports = authRouter;
