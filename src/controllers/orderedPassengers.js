const orderedPassengers = (passengers) => {
  const orderedBySeat = passengers.sort((a, b) => {
    if (a.seat_type_id !== b.seat_type_id) {
      return a.seat_type_id - b.seat_type_id;
    } else if (a.purchase_id !== b.purchase_id) {
      return a.purchase_id - b.purchase_id;
    } else {
      return a.seat_id - b.seat_id;
    }
  });
  return orderedBySeat;
};
module.exports = orderedPassengers;
