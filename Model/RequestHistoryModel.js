const { Schema, model } = require("mongoose");

const requestHistorySchema = new Schema(
    {
        email: {
            type: String,
            trim: true,
            required: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        file: {
            type: Schema.Types.ObjectId,
            ref: "RequestFile",
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

const RequestHistoryModel = model("RequestHistory", requestHistorySchema);
module.exports = RequestHistoryModel;
