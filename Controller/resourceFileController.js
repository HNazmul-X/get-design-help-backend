const RequestHistoryModel = require("../Model/RequestHistoryModel");
const ResourceFileModel = require("../Model/ResourceFileModel");
const UserModel = require("../Model/UserModel");
const MyEmailServer = require("../Util/MyEmailServer");
const { Schema } = require("mongoose");
const { throwError, downloaderWebsiteURL } = require("../Util/placeholder");
const { jsonFileToJS_Object } = require("../Util/fileReading");

exports.createResourceFileNewRequest = async (req, res, next) => {
    try {
        const { link, email, userId, platform } = req.body;
        console.log(req.body);
        const createdFile = await ResourceFileModel.create({
            requestedBy: userId,
            link: link,
            platform,
            email,
        });
        if (userId) {
            await UserModel.updateOne(
                { _id: userId },
                {
                    $push: { requestedFile: createdFile._id },
                },
            );
        }
        await RequestHistoryModel.create({
            email: email,
            userId: userId ? userId : null,
            file: createdFile._id,
        });
        res.json(createdFile);
    } catch (e) {
        next(e);
    }
};

exports.getResourceFileByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const resourceFiles = await ResourceFileModel.find({ requestedBy: userId }).populate("requestedBy", "username  email");
        res.json(resourceFiles);
    } catch (e) {
        next(e);
    }
};
exports.getAllResourceFile = async (req, res, next) => {
    try {
        const { page, quantity,afterDay, status } = req.query;
        console.log(req.query);
        const pageNo = page || 1;
        const fileQuantity = quantity || 12;
        const fileStatus = status || "pending";

        const findQuery = { status: fileStatus };

        const totalDocument = await ResourceFileModel.countDocuments();
        const resourceFiles = await ResourceFileModel.find(findQuery)
            .skip(pageNo * fileQuantity - fileQuantity)
            .limit(parseInt(fileQuantity))
            .populate("requestedBy", "username  email")
            .sort({ createdAt: -1 });
        if (resourceFiles)
            return res.json({
                files: resourceFiles,
                pageNo: pageNo,
                status: status,
                quantity: fileQuantity,
                totalDocument,
            });
        else throw new Error("no File exist", 404);
    } catch (e) {
        next(e);
    }
};

exports.updateResourceFileWithUploadedLink = async (req, res, next) => {
    try {
        const { uploadedFileLink } = req.body;
        const fileId = req.params?.fileId;
        const clientConfig = await jsonFileToJS_Object(process.cwd() + "/config/json/clientConfig.json");

        // checking validation
        if (!fileId || !uploadedFileLink) return res.json({ success: false, message: "Please Provide Valid Information" });
        else {
            const updatedFile = await ResourceFileModel.findByIdAndUpdate(
                { _id: fileId },
                {
                    $set: {
                        uploadedFileLink,
                        status: "approved",
                    },
                },
                { new: true },
            );
            console.log(`${clientConfig.fileDownloadURL}/${updatedFile._id}`);
            const sentEmailData = await MyEmailServer.emailSentWithNazmul_Sarlex_org({
                to: updatedFile.email,
                subject: "You file is Ready to Download",
                html: `<h1>Here is your file Link : <a href="${clientConfig.fileDownloadURL}/${updatedFile._id}">Click Here To Download</a> </h1>`,
            });
            console.log(sentEmailData);
            res.json({ sentEmailData, updatedFile });
        }
    } catch (e) {
        next(e);
    }
};

exports.deleteResourceFileById = async (req, res, next) => {
    try {
        const { fileId } = req.params;
        if (!fileId) return res.status(403).json({ success: false, error: true, message: "Please Specify which file do you want to delete" });

        //pulling from user array
        await UserModel.findOneAndUpdate(
            { requestedFile: { $in: [fileId] } },
            {
                $pull: {
                    requestedFile: fileId,
                },
            },
            { new: true },
        );

        //Deleting File Data
        await ResourceFileModel.findByIdAndDelete(fileId);
        res.json({ success: true, message: `${fileId} Deleted Successfully` });
    } catch (e) {
        next(e);
    }
};

exports.getResourceFileDownloadLinkByFileId = async (req, res, next) => {
    try {
        const { fileId } = req.params;
        if (!fileId) return res.json({ success: false, error: true, message: "Please Provide File Id" });
        const fileInfo = await ResourceFileModel.findById(fileId).populate("requestedBy", "username email");
        if (!fileInfo) return res.json({ success: false, error: true, message: "Doesn't Exist any file", fileExist: false });
        if (!fileInfo.uploadedFileLink) return res.json({ success: true, message: "File is Not Ready for Download", uploaded: false });
        return res.json(fileInfo);
    } catch (e) {
        next(e);
    }
};
