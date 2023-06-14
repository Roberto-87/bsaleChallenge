const returnSeats = (boardingPass) => {
  if (boardingPass.map((passenger) => passenger.seat_id === "null")) {
    boardingPass.map((passenger) => (passenger.seat_id = 1400));
  }
};
module.exports = returnSeats;
