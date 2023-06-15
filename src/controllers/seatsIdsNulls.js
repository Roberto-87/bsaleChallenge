const seatsIdsNull = (boardingPass) => {
  const seatAvailable = boardingPass.filter(
    (passenger) => passenger.seat_id === null
  );
  return seatAvailable;
};

module.exports = seatsIdsNull;
