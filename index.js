const express = require("express");
const initRoutes = require("./startup/routes");
const initDb = require("./startup/routes");
const initConfig = require("./startup/routes");

const app = express();

initConfig();
initRoutes(app);
initDb();

app.listen(8000, () => {
  console.log("listening on port 8000...");
});
