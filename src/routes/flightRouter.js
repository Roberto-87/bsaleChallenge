const { Router } = require("express");
const queryFlight = require("../controllers/queryFlight");
const queryBoardingPass = require("../controllers/queryBoardingPass");
const returnSeats = require("../controllers/queryBoardingPass");

const flightRouter = Router();

flightRouter.get("/:id/passengers", async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await queryFlight(id);
    const boardingPass = await queryBoardingPass(id);
    if (!flight) throw new Error("Flight not found");
    if (!boardingPass) throw new Error("Boarding Pass not found");
    const takeSeat = await returnSeats(boardingPass);

    res.status(200).json({
      code: 200,
      data: {
        flightId: flight[0].flight_id,
        takeoffDateTime: flight[0].takeoff_date_time,
        takeoffAirport: flight[0].takeoff_airport,
        landingDateTime: flight[0].landing_date_time,
        landingAirport: flight[0].landing_airport,
        airplaneId: flight[0].airplane_id,
        passengers: boardingPass,
      },
    });
  } catch (error) {
    res.status(404).send({ code: 404, data: {} });
  }
});

module.exports = flightRouter;
