const { Schema, model } = require("mongoose");

const resourceFileSchema = new Schema(
    {
        link: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        platform: {
            type: String,
            required: true,
            trim: true,
        },
        like: {
            type: Number,
            default: 0,
        },
        dislike: {
            type: Number,
            default: 0,
        },
        downloadTimes: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        requestedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        acceptedBy: {
            type: Schema.Types.ObjectId,
            ref: "Uer",
        },
    },
    { timestamps: true },
);


const ResourceFileModel = model("RequestFile", resourceFileSchema);
module.exports = ResourceFileModel;
