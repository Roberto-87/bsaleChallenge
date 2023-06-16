const { Router } = require("express");
const queryFlight = require("../controllers/queryFlight");
const queryBoardingPass = require("../controllers/queryBoardingPass");
const orderedPassengers = require("../controllers/orderedPassengers");
const returnNextSeat = require("../controllers/returnNextSeat");
const filterSeats = require("../controllers/filterSeats");

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

    for (let i = 0; i < passengers.length; i++) {
      if (
        passengers[i].age < 18 &&
        passengers[i].seat_id === null &&
        passengers[i + 1] &&
        passengers[i + 1].purchase_id === passengers[i].purchase_id &&
        passengers[i + 1].age >= 18
      ) {
        let seatByType = await filterSeats(
          passengers[i].seat_type_id,
          airplaneId,
          orderedBySeat
        );
        const seatIds = seatByType.map((seat) => seat.seat_id);
        const minValue = Math.min(...seatIds);
        //de los seatByType elijo un asiento que no esté ocupado !occupiedSeatId.includes(seat elegido)
        passengers[i].seat_id = minValue; //acá falta la lógica que trae el asiento por tipo de asiento y avion
        passengers[i + 1].seat_id = await returnNextSeat(minValue, airplaneId);
      } else if (
        passengers[i].age < 18 &&
        passengers[i].seat_id === null &&
        passengers[i - 1] &&
        passengers[i - 1].purchase_id === passengers[i].purchase_id &&
        passengers[i - 1].age >= 18
      ) {
        let seatByType = await filterSeats(
          passengers[i].seat_type_id,
          airplaneId,
          orderedBySeat
        );
        const seatIds = seatByType.map((seat) => seat.seat_id);
        const minValue = Math.min(...seatIds);
        //de los seatByType elijo un asiento que no esté ocupado !occupiedSeatId.includes(seat elegido)
        passengers[i].seat_id = minValue; //acá falta la lógica que trae el asiento por tipo de asiento y avion
        passengers[i - 1].seat_id = await returnNextSeat(minValue, airplaneId);

        //si son adultos y tienen el mismo purchase_id y el next asiento no está incluido en notAvailableSeat le damos el next sino usamos una función que se llame closer y los acomodamos en el next asiento de cercanía en fila o columna
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
