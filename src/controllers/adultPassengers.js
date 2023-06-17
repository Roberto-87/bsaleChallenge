const filterSeats = require("../controllers/filterSeats");
const returnNextSeat = require("../controllers/returnNextSeat");
const notAvailableSeat = require("./notAvailableSeat");

const adultPassengers = async (passengers, airplaneId, orderedBySeat) => {
  for (let i = 0; i < passengers.length; i++) {
    //recorro los pasajeros hasta encontrar un mayor de 18 y que el next sea > 18 tambien
    if (
      passengers[i].seat_type === null &&
      passengers[i + 1].seat_type === null
    ) {
      //si el pasajero sigiente tiene igual purchase id entramos al condi
      if (passengers[i].purchase_id === passengers[i + 1].purchase_id) {
        //traemos un array con todos los asientos disponibles de su tipo y avión
        let seatByType = await filterSeats(
          passengers[i].seat_type_id,
          airplaneId,
          orderedBySeat
        );
        //mapeo solo los números de seat_id
        const seatIds = seatByType.map((seat) => seat.seat_id);
        //eligo el mínimo de los asientos libres y se lo adjudico al pasjero 1
        const minValue = Math.min(...seatIds);
        passengers[i].seat_id = minValue;

        const notAvailable = notAvailableSeat(passengers, airplaneId);
        const nextSeat = await returnNextSeat(minValue, airplaneId);
        if (!notAvailable.include(nextSeat)) {
          passengers[i + 1].seat_id = nextSeat;
        } else {
          nextSeat++;
        }
      } else if (passengers[i].purchase_id !== passengers[i + 1].purchase_id) {
        const seatIds = seatByType.map((seat) => seat.seat_id);
        const notAvailable = notAvailableSeat(passengers, airplaneId);
        const randomIndex = Math.floor(Math.random() * seatIds.length);
        const randomSeat = seatIds[randomIndex];

        if (!notAvailable.include(randomSeat)) {
          passengers[i + 1].seat_id = randomSeat;
        } else {
          randomSeat++;
        }
      }
    }
  }
};

module.exports = adultPassengers;
