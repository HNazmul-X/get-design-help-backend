const ResourceFileModel = require("../Model/ResourceFileModel");
const UserModel = require("../Model/UserModel");

exports.sendResourceFileLinkRequest = async (req, res, next) => {
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
        res.json(createdFile);
    } catch (e) {
        next(e);
    }
};

exports.getResourceFileByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const resourceFiles = await ResourceFileModel.find({requestedBy:userId});
        res.json(resourceFiles);
    } catch (e) {
        next(e);
    }
};
