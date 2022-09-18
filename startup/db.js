const mongoose = require("mongoose");

function initDb() {
  mongoose
    .connect("mongodb://localhost/myown-intensive-foods")
    .then(() => console.log("connect to MongoDB"))
    .catch((error) => console.log("could not connect...", error));
}

module.exports = initDb;
