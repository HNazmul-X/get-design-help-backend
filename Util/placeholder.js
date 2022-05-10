exports.placeholderController = (req, res, next) => {
    console.log("hi");
    res.json({ "want to say": "I am placeholder", params: { ...req.params } });
};

exports.lateResponse = (req, res, next) => {
    setTimeout(() => {
        next();
    }, 2000);
};
