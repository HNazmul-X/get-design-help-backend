const { sendResourceFileLinkRequest, getResourceFileByUserId } = require("../Controller/resourceFileController");
const { placeholderController, lateResponse } = require("../Util/placeholder");
const resourceFileRouter = require("express").Router();

resourceFileRouter.post("/send-resource-file-request",lateResponse, sendResourceFileLinkRequest);
resourceFileRouter.get("/get-recourse-file-by-userId/:userId",getResourceFileByUserId)

module.exports = resourceFileRouter;
