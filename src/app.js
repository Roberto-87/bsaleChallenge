const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./routes");

const app = express();

app.use(mainRouter);
app.use(morgan("dev"));

module.exports = app;
