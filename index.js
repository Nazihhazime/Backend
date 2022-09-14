const express = require("express");
const mongoose = require("mongoose");
const foods = require("./routes/foods");
const categories = require("./routes/categories");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/foods", foods);
app.use("/api/categories", categories);
mongoose
  .connect("mongodb://localhost/myown-intensive-foods")
  .then(() => console.log("connect to MongoDB"))
  .catch((error) => console.log("could not conecct...", error));

app.listen(8000, () => {
  console.log("listening on port 8000...");
});
