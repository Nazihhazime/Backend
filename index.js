const express = require("express");
const mongoose = require("mongoose");
const initRoutes = require("./startup/routes");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

initRoutes(app);

mongoose
  .connect("mongodb://localhost/myown-intensive-foods")
  .then(() => console.log("connect to MongoDB"))
  .catch((error) => console.log("could not connect...", error));

app.listen(8000, () => {
  console.log("listening on port 8000...");
});
