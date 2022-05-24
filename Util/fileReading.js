const fs_promise = require("node:fs/promises");

// JSON File to Javascript Object Return
exports.jsonFileToJS_Object = async (path, ...arg) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fileData = await fs_promise.readFile(path);
            resolve(JSON.parse(fileData.toString("utf-8")));
        } catch (e) {
            reject(e);
        }
    });
};
