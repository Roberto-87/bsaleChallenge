const notAvailableSeat = require("../controllers/notAvailableSeat");
const querySeatType = require("../controllers/querySeatType");

const filterSeats = async (seatTypeId, airplaneId, orderedBySeat) => {
  const notAvailable = notAvailableSeat(orderedBySeat);
  const queryTypeOfSeat = await querySeatType(); //traigo el mapa de asientos de la db

  return queryTypeOfSeat.filter(
    (airplane) =>
      airplane.airplane_id === airplaneId &&
      airplane.seat_type_id === seatTypeId &&
      !notAvailable.includes(airplane.seat_id) //filtro también los que están ocupados
  );
};

module.exports = filterSeats;
