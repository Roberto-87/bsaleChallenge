const changeDataPassengers = (passengers) => {
  const passengersOk = passengers.map((passenger) => {
    return {
      passengerId: passenger.passenger_id,
      dni: passenger.dni,
      name: passenger.name,
      age: passenger.age,
      country: passenger.country,
      boardingPassId: passenger.boarding_pass_id,
      purchaseId: passenger.purchase_id,
      seatTypeId: passenger.seat_type_id,
      seatId: passenger.seat_id,
    };
  });
  return passengersOk;
};

module.exports = changeDataPassengers;
