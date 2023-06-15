const notAvailableSeat = (orderedBySeat) => {
  const occupiedSeat = orderedBySeat
    .filter((passenger) => passenger.seat_id !== null)
    .map((passenger) => passenger.seat_id);

  return occupiedSeat;
};

module.exports = notAvailableSeat;
