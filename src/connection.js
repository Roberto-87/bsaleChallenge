require("dotenv").config();
const mysql = require("mysql2");
const { HOST, USER, PASSWORD, DATABASE } = process.env;

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    /*     connectTimeout: 5000,
    multipleStatements: true, */
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
      setTimeout(handleDisconnect, 200);
    }
    console.log("Conexión establecida");
  });
}

handleDisconnect();

/* process.on("SIGINT", () => {
  console.log("Reiniciando conexión con la base de datos...");
  connection.end(() => {
    handleDisconnect();
  });
}); */

module.exports = connection;
