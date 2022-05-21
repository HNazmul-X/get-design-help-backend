exports.placeholderController = (req, res, next) => {
    console.log("hi");
    res.json({ "want to say": "I am placeholder", params: { ...req.params } });
};

exports.lateResponse = (req, res, next) => {
    setTimeout(() => {
        next();
    }, 4000);
};


exports.throwError = (message) => {
    throw new Error(message,422)
}

exports.downloaderWebsiteURL = `https://GDHDownloader.com/file`