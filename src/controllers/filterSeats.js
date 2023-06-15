const filterSeats = (seatTypeId, airplaneId) => {
  return seat.filter(
    (airplane) =>
      airplane.airplane_id === airplaneId &&
      airplane.seat_type_id === seatTypeId
  );
};

module.exports = filterSeats;
/* 
const turistAirplaneOne = filterSeats(1, 3);
const turistPremiumAirplaneOne = filterSeats(1, 2);
const FirstClassAirplaneOne = filterSeats(1, 1);
const turistAirplaneTwo = filterSeats(2, 3);
const turistPremiumAirplaneTwo = filterSeats(2, 2);
const FirstClassAirplaneTwo = filterSeats(2, 1);
 */
