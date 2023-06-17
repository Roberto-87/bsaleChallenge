const notAvailableSeat = (passengers) => {
  const occupiedSeat = passengers
    .filter((passenger) => passenger.seat_id !== null)
    .map((passengerSeat) => passengerSeat.seat_id);

  return occupiedSeat;
};

module.exports = notAvailableSeat;
