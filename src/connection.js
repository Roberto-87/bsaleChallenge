/*
require("dotenv").config();
const mysql = require("mysql2");
const { HOST, USER, PASSWORD, DATABASE } = process.env;

let connection;

/* function handleDisconnect() { 
connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
       connectTimeout: 5000,
    multipleStatements: true,
});

/*   connection.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
      setTimeout(handleDisconnect, 200);
    }
    console.log("Conexión establecida");
  });
} */
/* 
handleDisconnect();
 */
/* process.on("SIGINT", () => {
  console.log("Reiniciando conexión con la base de datos...");
  connection.end(() => {
    handleDisconnect();
  });
}); 

module.exports = connection;
*/
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
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
      setTimeout(handleDisconnect, 200);
    }
    console.log("Conexión establecida");

    // Realizar ping al servidor cada 4 segundos para mantener la conexión activa
    setInterval(() => {
      connection.ping((err) => {
        if (err) {
          console.error("Error en el ping de la base de datos:", err);
          handleDisconnect(); // Reconectar si se produce un error en el ping
        }
        console.log("Ping enviado");
      });
    }, 4000);
  });
}

handleDisconnect();

module.exports = connection;
