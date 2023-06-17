const returnNextColumn = async (minValue, airplaneId) => {
  const seats = await querySeatType();
  const row = seats.find((seat) => seat.seat_id === minValue).seat_row;
  const column = seats.find((seat) => seat.seat_id === minValue).seat_column;

  if (airplaneId === 1) {
    if (column === "A" || column === "B" || column === "C") {
      const nextColumn = seats.find(
        (seat) =>
          (seat.seat_row === row && seat.seat_column === "G") ||
          seat.seat_column === "F" ||
          (seat.seat_column === "E" && seat.airplane_id === airplaneId)
      );
      return nextColumn;
    } else if (column === "G" || column === "F" || column === "E") {
      const nextColumn = seats.find(
        (seat) =>
          (seat.seat_row === row && seat.seat_column === "A") ||
          seat.seat_column === "B" ||
          (seat.seat_column === "C" && seat.airplane_id === airplaneId)
      );
      return nextColumn;
    }
  } else if (airplaneId === 2) {
    if (column === "A" || column === "B") {
      const nextColumn = seats.find(
        (seat) =>
          (seat.seat_row === row && seat.seat_column === "D") ||
          seat.seat_column === "F" ||
          (seat.seat_column === "E" && seat.airplane_id === airplaneId) ||
          (seat.seat_row === row && seat.seat_column === "H") ||
          (seat.seat_row === row && seat.seat_column === "I")
      );
      return nextColumn;
    } else if (column === "D" || column === "F" || column === "E") {
      const nextColumn = seats.find(
        (seat) =>
          (seat.seat_row === row && seat.seat_column === "A") ||
          seat.seat_column === "B" ||
          (seat.seat_row === row && seat.seat_column === "H") ||
          (seat.seat_row === row && seat.seat_column === "I")
      );
      return nextColumn;
    }
  }
  return null;
};

module.exports = returnNextColumn;
