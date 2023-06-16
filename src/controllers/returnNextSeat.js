const querySeatType = require("../controllers/querySeatType");

const returnNextSeat = async (minValue, airplaneId) => {
  //retorna el asiento de al lado
  //recibo el seatId 176 tengo que ir a buscar que fila y columna es para responder con el asiento de al lado
  const seats = await querySeatType();
  const row = seats.find((seat) => seat.seat_id === minValue).seat_row;
  const column = seats.find((seat) => seat.seat_id === minValue).seat_column;

  const nextSeat = seats.find(
    (seat) =>
      seat.seat_row === row &&
      seat.seat_column !== column &&
      seat.airplane_id === airplaneId
  );
  return nextSeat.seat_id;
};

module.exports = returnNextSeat;

//determinar qué asientos están libres
//el seat_id se determinará teniendo en cuenta:
// -el tipo de asiento comprado
// -si es menor de edad
// -los otros pasajeros que comparten su purchase_id
//esto depende del airplane_id => cuántos asientos tengo
