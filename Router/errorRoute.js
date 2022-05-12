module.exports = (app) => {
    app.use((req, res, next) => {
        throw new Error("Route not Found", 404);
    });

    app.use((error, req, res, next) => {
        console.log(`\x1b[41m ${error} \x1b[0m`)
        res.status(200).json({ success: false, error: true, message: error.message });
    });
};
