const filterSeats = require("../controllers/filterSeats");
const returnNextSeat = require("../controllers/returnNextSeat");
const notAvailableSeat = require("../controllers/notAvailableSeat");
const underAgePassenger = async (passengers, airplaneId, orderedBySeat) => {
  let notAvailable = notAvailableSeat(orderedBySeat, airplaneId);

  for (let i = 0; i < passengers.length; i++) {
    if (
      passengers[i].age < 18 &&
      passengers[i].seat_id === null &&
      passengers[i + 1] &&
      passengers[i + 1].purchase_id === passengers[i].purchase_id &&
      passengers[i + 1].age >= 18
    ) {
      let seatByType = await filterSeats(
        passengers[i].seat_type_id,
        airplaneId,
        orderedBySeat
      );
      const seatIds = seatByType.map((seat) => seat.seat_id);
      const minValue = Math.min(...seatIds);
      passengers[i].seat_id = minValue;
      notAvailable.push(minValue);
      passengers[i + 1].seat_id = await returnNextSeat(minValue, airplaneId);
      notAvailable.push(passengers[i + 1].seat_id);
    } else if (
      passengers[i].age < 18 &&
      passengers[i].seat_id === null &&
      passengers[i - 1] &&
      passengers[i - 1].purchase_id === passengers[i].purchase_id &&
      passengers[i - 1].age >= 18
    ) {
      let seatByType = await filterSeats(
        passengers[i].seat_type_id,
        airplaneId,
        orderedBySeat
      );
      const seatIds = seatByType.map((seat) => seat.seat_id);
      const minValue = Math.min(...seatIds);
      passengers[i].seat_id = minValue;
      notAvailable.push(minValue);
      passengers[i - 1].seat_id = await returnNextSeat(minValue, airplaneId);
      notAvailable.push(passengers[i - 1].seat_id);
    }
  }
  return passengers;
};

module.exports = underAgePassenger;
