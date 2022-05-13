const authRouter = require("./authRouter");
const resourceFile = require("./resourceFileRouter");

const all_routes = [
    {
        path: "/api/auth",
        handler: authRouter,
    },
    {
        path: "/api/resource-file",
        handler:resourceFile,
    },
    {
        path: "/",
        handler: () => null,
    },
];

module.exports = function (app) {
    all_routes.forEach((route) => {
        app.use(route.path, route.handler);
    });
};
