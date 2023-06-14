const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./routes");
const connection = require("./connection");

const app = express();

connection.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
  console.log("Conexión exitosa a la base de datos.");
});

app.use(mainRouter);
app.use(morgan("dev"));

module.exports = app;
