const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const database = require("./database");
const TrainModel = require("./database/models/train");
const app = express();

app.use(cors());
app.use(express.json());
const api = require("./api");

app.use("/api", api);
database.connectToDatabase();

app.listen(5005, () => {
  console.log('Server started on port 5005');
});