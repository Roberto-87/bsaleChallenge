const { Router } = require("express");
const flightRouter = require("./flightRouter");

const mainRouter = Router();
mainRouter.use("/flights", flightRouter);

module.exports = mainRouter;
