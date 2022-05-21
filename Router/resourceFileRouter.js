const { createResourceFileNewRequest, getResourceFileByUserId, getAllResourceFile, updateResourceFileWithUploadedLink, deleteResourceFileById } = require("../Controller/resourceFileController");
const { placeholderController, lateResponse } = require("../Util/placeholder");
const resourceFileRouter = require("express").Router();

resourceFileRouter.post("/send-resource-file-request", createResourceFileNewRequest);
resourceFileRouter.get("/get-recourse-file-by-userId/:userId", getResourceFileByUserId);
resourceFileRouter.get("/get-recourse-file", getAllResourceFile);
resourceFileRouter.post("/save-file-with-uploaded-file-link/:fileId", updateResourceFileWithUploadedLink);
resourceFileRouter.delete("/delete-resource-file-by-id/:fileId", deleteResourceFileById);

module.exports = resourceFileRouter;
