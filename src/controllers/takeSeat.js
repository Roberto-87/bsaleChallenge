const filterSeats = require("../controllers/filterSeats");

const takeSeat = (
  orderedBySeat,
  airplaneId,
  occupiedSeatId,
  queryTypeOfSeat
) => {
  for (let i = 0; i < orderedBySeat.length; i++) {
    const seatMap = filterSeats(orderedBySeat[i].seat_type_id, airplaneId);
    console.log(seatMap);
  }
};

module.exports = takeSeat;

//determinar qué asientos están libres
//el seat_id se determinará teniendo en cuenta:
// -el tipo de asiento comprado
// -si es menor de edad
// -los otros pasajeros que comparten su purchase_id
//esto depende del airplane_id => cuántos asientos tengo

//avión 1
//asientos en primera: 16 asientos fila 1 a 4  - type 1
//asientos en economica premium: 48 asientos fila 8 a 15 - type 2
//asientos en economica: 96 asientos fila 19 a 34 - type 3

//avión 2
//asientos en primera: 15 asientos fila 1 a 5 - type 1
//asientos en economica premium: 42 asientos  fila 9 a 14 - type 2
//asientos en economica:  98 asientos  fila 18 a 31 - type 3
