const returnNextColumn = async (minValue, airplaneId) => {
  const seats = await querySeatType();
  const seat = seats.find((seat) => seat.seat_id === minValue);

  if (seat) {
    const { seat_row, seat_column } = seat;
    let nextColumn = null;

    if (airplaneId === 1) {
      if (seat_column === "A" || seat_column === "B" || seat_column === "C") {
        nextColumn = seats.find(
          (seat) =>
            (seat.seat_row === seat_row && seat.seat_column === "G") ||
            seat.seat_column === "F" ||
            (seat.seat_column === "E" && seat.airplane_id === airplaneId)
        );
      } else if (
        seat_column === "G" ||
        seat_column === "F" ||
        seat_column === "E"
      ) {
        nextColumn = seats.find(
          (seat) =>
            (seat.seat_row === seat_row && seat.seat_column === "A") ||
            seat.seat_column === "B" ||
            (seat.seat_column === "C" && seat.airplane_id === airplaneId)
        );
      }
    } else if (airplaneId === 2) {
      if (seat_column === "A" || seat_column === "B") {
        nextColumn = seats.find(
          (seat) =>
            (seat.seat_row === seat_row && seat.seat_column === "D") ||
            seat.seat_column === "F" ||
            (seat.seat_column === "E" && seat.airplane_id === airplaneId) ||
            seat.seat_column === "H" ||
            seat.seat_column === "I"
        );
      } else if (
        seat_column === "D" ||
        seat_column === "F" ||
        seat_column === "E"
      ) {
        nextColumn = seats.find(
          (seat) =>
            (seat.seat_row === seat_row && seat.seat_column === "A") ||
            seat.seat_column === "B" ||
            seat.seat_column === "H" ||
            (seat.seat_row === seat_row && seat.seat_column === "I")
        );
      }
    }

    return nextColumn;
  }

  return null;
};

module.exports = returnNextColumn;
