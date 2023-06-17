const connection = require("../connection");

const queryBoardingPass = (id) => {
  const passengers = [];

  return new Promise((resolve, reject) => {
    const query = `SELECT
      passenger.passenger_id,
      passenger.dni,
      passenger.name,
      passenger.age,
      passenger.country,
      boarding_pass.boarding_pass_id,
      boarding_pass.purchase_id,
      boarding_pass.seat_type_id,
      boarding_pass.seat_id
    FROM
      passenger
      JOIN boarding_pass ON passenger.passenger_id = boarding_pass.passenger_id
    WHERE
      boarding_pass.flight_id = ${id}`;

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

module.exports = queryBoardingPass;
