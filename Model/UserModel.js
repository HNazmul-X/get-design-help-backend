const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 5,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            trim: true,
            unique: true,
        },
        social: {
            telegram: String,
            twitter: String,
            facebook: String,
            linkedIn: String,
        },
        password: String,
        profilePic: {
            type: String,
            default: "/static/images/default-profile.png",
        },
        isVerified: {
            unique: {
                type: Boolean,
                default: false,
            },
            email: {
                type: Boolean,
                default: false,
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        requestedFile: [
            {
                type: Schema.Types.ObjectId,
                ref: "RequestedFile",
            },
        ],
        requestHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "RequestHistory",
            },
        ],
        downloadedFile: [
            {
                file: {
                    type: Schema.Types.ObjectId,
                    ref: "RequestedFile",
                },
                downloadTimes: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

const UserModel = model("User", userSchema);
module.exports = UserModel;
