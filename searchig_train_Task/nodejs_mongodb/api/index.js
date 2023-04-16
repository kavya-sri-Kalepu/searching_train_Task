const express = require("express");
const router = express.Router();
const TrainModel = require("../database/models/train");

const calculatePrice = (distance) => {
  return distance * 1.25;
};

router.get("/stations", async (_req, res) => {
  try {
    const stations = await TrainModel.aggregate([
      { $unwind: "$stops" },
      { $group: { _id: "$stops.station" } },
      { $project: { _id: 0, station: "$_id" } },
    ]);

    res.json(stations);
  } catch (error) {
    console.error("Error fetching stations data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/trains", async (req, res) => {
  try {
    const source = req.query.source;
    const destination = req.query.destination;

    const trains = await TrainModel.find({
      stops: { $elemMatch: { station: { $in: [source, destination] } } },
    });

    console.log(trains);

    const filteredTrains = trains.filter((train) => {
      const sourceIndex = train.stops.findIndex(
        (stop) => stop.station === source
      );
      const destinationIndex = train.stops.findIndex(
        (stop) => stop.station === destination
      );
      console.log(sourceIndex, destinationIndex);
      return sourceIndex >= 0 && destinationIndex >= 0 && sourceIndex < destinationIndex;
    });

    const output = filteredTrains.map((train) => {
      const sourceIndex = train.stops.findIndex(
        (stop) => stop.station === source
      );
      const destinationIndex = train.stops.findIndex(
        (stop) => stop.station === destination
      );
      const distance = train.stops
        .slice(sourceIndex, destinationIndex + 1)
        .reduce((acc, stop) => acc + stop.distanceFromPrev, 0);
      const price = calculatePrice(distance);
      return {
        trainName: train.trainName,
        departureTime: train.stops[sourceIndex].departureTime,
        arrivalTime: train.stops[destinationIndex].departureTime,
        distance,
        price,
      };
    });

    res.json(output);
  } catch (error) {
    console.error("Error fetching train data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;