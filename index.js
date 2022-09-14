const express = require("express");
const foods = require("./routes/foods");
const categories = require("./routes/categories");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/foods", foods);
app.use("/api/categories", categories);

app.listen(8000, () => {
  console.log("listening on port 8000...");
});
