const { Schema, model } = require("mongoose");

const verificationSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            trim: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        isUsed:{
            
        },
        expireAfter: {
            type: Date,
            default: Date.now() + 1000 * 60 * 60 * 24,
        },
    },
    { timestamps: true },
);

verificationSchema.index({ expireAfter: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

const VerificationModel = model("Verification", verificationSchema);
module.exports = VerificationModel;
