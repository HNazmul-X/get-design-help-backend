require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { mongoURI } = require("../config/mongoURI");
const cors = require("cors");

const middlewares = [cors(), express.json(), express.urlencoded({ extended: true }), express.static("/Public"), morgan("dev"), ,];

module.exports = (app) => {
    middlewares.forEach((middleware) => app.use(middleware));
};
