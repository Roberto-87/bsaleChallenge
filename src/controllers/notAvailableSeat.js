const notAvailableSeat = (passengers, airplaneId) => {
  const occupiedSeat = passengers
    .filter(
      (passenger) =>
        passenger.seat_id !== null && passenger.airplane_id === airplaneId
    )
    .map((passengerSeat) => passengerSeat.seat_id);

  return occupiedSeat;
};

module.exports = notAvailableSeat;
