const { Router } = require("express");
const queryFlight = require("../controllers/queryFlight");
const queryBoardingPass = require("../controllers/queryBoardingPass");
const orderedPassengers = require("../controllers/orderedPassengers");
const underAgePassenger = require("../controllers/underAgePassenger");
const filterSeats = require("../controllers/filterSeats");
const returnNextSeat = require("../controllers/returnNextSeat");
const notAvailableSeat = require("../controllers/notAvailableSeat");
const returnNextColumn = require("../controllers/returnNextColumn");
const changeDataPassengers = require("../controllers/changeDataPassengers");

const flightRouter = Router();

flightRouter.get("/:id/passengers", async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await queryFlight(id);
    if (!flight) throw new Error("Flight not found");
    const passengers = await queryBoardingPass(id);

    if (!passengers) throw new Error("Boarding Pass not found");
    const orderedBySeat = orderedPassengers(passengers);
    const airplaneId = flight[0].airplane_id;
    const underAgeAndAdultSeats = await underAgePassenger(
      passengers,
      airplaneId,
      orderedBySeat
    );

    const notAvailable = [
      ...notAvailableSeat(passengers),
      ...underAgeAndAdultSeats,
    ];

    for (let i = 0; i < passengers.length; i++) {
      let passenger = passengers[i];
      let nextPassenger = passengers[i + 1];
      let previousPassenger = passengers[i - 1];
      let passengerSeatType = passenger.seat_type_id;

      if (
        (passenger.seat_id === null &&
          nextPassenger &&
          nextPassenger.seat_id === null) ||
        (passenger.seat_id === null &&
          previousPassenger &&
          previousPassenger.seat_id === null)
      ) {
        if (
          passenger.purchase_id === nextPassenger.purchase_id ||
          passenger.purchase_id === previousPassenger.purchase_id
        ) {
          {
            let availableSeats = await filterSeats(
              passengerSeatType,
              airplaneId,
              orderedBySeat
            );
            const availableSeatId = availableSeats.map((seat) => seat.seat_id);
            const minValue = Math.min(...availableSeatId);
            const nextSeat = await returnNextSeat(minValue, airplaneId);
            //const nextColumn = await returnNextColumn(minValue, airplaneId);

            if (!notAvailable.includes(minValue)) {
              passenger.seat_id = minValue;
              notAvailable.push(minValue);
            }

            if (!notAvailable.includes(nextSeat)) {
              nextPassenger.seat_id = nextSeat;
              notAvailable.push(nextSeat);
            } /* else if (!notAvailable.includes(nextColumn)) {
              nextPassenger.seat_id = nextColumn;
              notAvailable.push(nextSeat);
            } */
          }
        }
      }
    }
    res.status(200).json({
      code: 200,
      data: {
        flightId: flight[0].flight_id,
        takeoffDateTime: flight[0].takeoff_date_time,
        takeoffAirport: flight[0].takeoff_airport,
        landingDateTime: flight[0].landing_date_time,
        landingAirport: flight[0].landing_airport,
        airplaneId: flight[0].airplane_id,
        passengers: passengers,
      },
    });
  } catch (error) {
    res.status(404).send({ code: 404, data: {} });
  }
});

module.exports = flightRouter;
