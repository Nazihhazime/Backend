const express = require("express");

const initRoutes = require("./startup/routes");
const initDb = require("./startup/routes");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

initRoutes(app);
initDb();

app.listen(8000, () => {
  console.log("listening on port 8000...");
});
