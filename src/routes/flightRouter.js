const { Router } = require("express");
const queryFlight = require("../controllers/queryFlight");
const queryBoardingPass = require("../controllers/queryBoardingPass");
const querySeatType = require("../controllers/querySeatType");
const orderedPassengers = require("../controllers/orderedPassengers");
const notAvailableSeat = require("../controllers/notAvailableSeat");
const takeSeat = require("../controllers/takeSeat");

const flightRouter = Router();

flightRouter.get("/:id/passengers", async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await queryFlight(id);
    if (!flight) throw new Error("Flight not found");
    const passengers = await queryBoardingPass(id);
    if (!passengers) throw new Error("Boarding Pass not found");
    const queryTypeOfSeat = await querySeatType(); //traigo el mapa de asientos de la db
    const orderedBySeat = orderedPassengers(passengers);
    const occupiedSeatId = notAvailableSeat(orderedBySeat);
    const airplaneId = flight[0].airplane_id;

    const needToSeat = takeSeat(
      orderedBySeat,
      airplaneId,
      occupiedSeatId,
      queryTypeOfSeat
    );

    res.status(200).json({
      code: 200,
      data: {
        flightId: flight[0].flight_id,
        takeoffDateTime: flight[0].takeoff_date_time,
        takeoffAirport: flight[0].takeoff_airport,
        landingDateTime: flight[0].landing_date_time,
        landingAirport: flight[0].landing_airport,
        airplaneId: flight[0].airplane_id,
        passengers: orderedBySeat,
      },
    });
  } catch (error) {
    res.status(404).send({ code: 404, data: {} });
  }
});

module.exports = flightRouter;
