const mongoose = require("mongoose");

const connectToDatabase = () => {
  
  mongoose.connect("mongodb://127.0.0.1:27017/train_search_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const database = mongoose.connection;

  database.on("error", (error) => {
    console.error("Error connecting to the database:", error);
  });

  database.once("open", () => {
    console.log("Connected to the database.");
  });
};

module.exports = { connectToDatabase };