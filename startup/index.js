const initRoutes = require("./routes");
const initDb = require("./routes");
const initConfig = require("./routes");

function startup(app) {
  initConfig();
  initRoutes(app);
  initDb();
}
