const testRouter = require("../Playground/Playground");
const authRouter = require("./authRouter");
const resourceFile = require("./resourceFileRouter");
const rootRouter = require("./rootRouter");

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
        path: "/api/playground",
        handler:testRouter,
    },
    {
        path: "/",
        handler: rootRouter,
    },
];

module.exports = function (app) {
    all_routes.forEach((route) => {
        app.use(route.path, route.handler);
    });
};
