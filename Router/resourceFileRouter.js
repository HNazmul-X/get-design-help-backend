const {
    createResourceFileNewRequest,
    getResourceFileByUserId,
    getAllResourceFile,
    updateResourceFileWithUploadedLink,
    deleteResourceFileById,
    getResourceFileDownloadLinkByFileId,
} = require("../Controller/resourceFileController");
const AuthMiddleWare = require("../Middleware/authMiddleware");
const { placeholderController, lateResponse } = require("../Util/placeholder");
const resourceFileRouter = require("express").Router();

resourceFileRouter.post("/send-resource-file-request", createResourceFileNewRequest);
resourceFileRouter.get("/get-recourse-file-by-userId/:userId", getResourceFileByUserId);
resourceFileRouter.get("/get-recourse-file", getAllResourceFile);
resourceFileRouter.post("/save-file-with-uploaded-file-link/:fileId", updateResourceFileWithUploadedLink);
resourceFileRouter.delete("/delete-resource-file-by-id/:fileId", deleteResourceFileById);
resourceFileRouter.get("/get-resource-file-download-link/:fileId", getResourceFileDownloadLinkByFileId);
resourceFileRouter.get("/get-latest-requestedFile-for-user/:userId",placeholderController);
resourceFileRouter.get("/get-request-all-days/:days",placeholderController)

module.exports = resourceFileRouter;
