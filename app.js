const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { mongoURI } = require("./config/mongoURI");
const DefaultMiddleware = require("./Middleware/DefaultMiddleware");
const routeConnector = require("./Router/routeConnector");
const PORT = process.env.PORT || 1080;

//@@@@++++ Connecting Middleware;
app.set("trust proxy", 1)
DefaultMiddleware(app);

//@@@@ Connecting Router;
routeConnector(app);


//@@@ Connecting Mongoose;
mongoose
    .connect(`${mongoURI}`)
    .then(() =>
        console.log(
            `\x1b[1m\x1b[107m\x1b[103m >> \x1b[0m\x1b[97m\x1b[42m Database Connection SuccessFully \x1b[0m\x1b[1m\x1b[107m\x1b[103m >> \x1b[0m\x1b[4m\x1b[97m\x1b[42m\x1b[1m http://localhost:${PORT} \x1b[0m`,
        ),
    );

app.get("/", (req, res, next) => {
    res.send(Buffer.from("Hey, Don't Worry I am working"));
});

app.listen(PORT);
