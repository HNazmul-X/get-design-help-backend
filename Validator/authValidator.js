const { body } = require("express-validator");
const UserModel = require("../Model/UserModel");

module.exports = class AuthValidator {
    constructor() {}

    static signUpValidator = [
        body("username")
            .notEmpty()
            .withMessage("username Cannot be empty")
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage("username only Letter and Number")
            .toLowerCase()
            .custom(async (value, { req }) => {
                const isUserFound = await UserModel.findOne({ username: value });
                if (isUserFound) {
                    throw new Error("this username already taken");
                } else {
                    return true;
                }
            }),
        body("email")
            .notEmpty()
            .withMessage("Email Cannot be Empty")
            .isEmail()
            .withMessage("email Must be valid")
            .custom(async (value, { req }) => {
                const isUserFound = await UserModel.findOne({ email: value });
                if (isUserFound) {
                    throw new Error("This email Already Registered, Try another one");
                } else {
                    return true;
                }
            }),
        body("password")
            .notEmpty()
            .withMessage("Password Cannot be Empty")
            .custom((value, { req }) => {
                if (value.length < 8) {
                    throw new Error("Password cannot be lower then 8 chars");
                } 
                return true
            }),
        body("confirmPassword").notEmpty().withMessage("ConfirmPassword Cannot be Empty").custom((value,{req}) => {
            if(value !== req.body.password){
                throw new Error("Both Password Doesn't Match")
            } 
            return true
        })
    ];
};
