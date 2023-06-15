const returnSeats = (boardingPass) => {
  const underAge = boardingPass
    .filter((passenger) => passenger.age < 18)
    .map((passenger) => passenger.purchase_id)
    .sort((a, b) => a - b);

  const overAge = boardingPass
    .filter((passenger) => passenger.age > 18)
    .map((passenger) => passenger.purchase_id)
    .sort((a, b) => a - b);

  let samePurchaseId = overAge.filter((passenger) =>
    underAge.includes(passenger)
  );

  return samePurchaseId; //purchase_id de los grupos con menores de edad
};

module.exports = returnSeats;

//determinar qué asientos están libres
//el seat_id se determinará teniendo en cuenta:
// -el tipo de asiento comprado
// -si es menor de edad
// -si otros pasajeros comparten su purchase_id y su seat_type_id
//esto depende del airplane_id => cuántos asientos tengo

//avión 1
//asientos en primera: 16 asientos fila 1 a 4  - type 1
//asientos en economica premium: 48 asientos fila 8 a 15 - type 2
//asientos en economica: 96 asientos fila 19 a 34 - type 3

//avión 2
//asientos en primera: 15 asientos fila 1 a 5 - type 1
//asientos en economica premium: 42 asientos  fila 9 a 14 - type 2
//asientos en economica:  98 asientos  fila 18 a 31 - type 3
