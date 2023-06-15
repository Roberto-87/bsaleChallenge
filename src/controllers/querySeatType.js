const connection = require("../connection");

const querySeatType = () => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM seat`;
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

module.exports = querySeatType;
