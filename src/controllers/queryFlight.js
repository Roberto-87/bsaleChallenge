const connection = require("../connection");

const queryFlights = (id) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM flight WHERE flight_id= (${id})`;

    connection.query(query, (error, data) => {
      if (error) {
        const errorDb = {
          code: 400,
          errors: "could not connect to db",
        };
        reject(errorDb);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = queryFlights;
