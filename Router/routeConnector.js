const authRouter = require("./authRouter");

const all_routes = [
    {
        path: "/api/auth",
        handler: authRouter,
    },
    {
        path: "/api/requested-file",
        handler: () => null,
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
