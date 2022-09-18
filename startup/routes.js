const express = require("express");
const cors = require("cors");
const foods = require("../routes/foods");
const auth = require("../routes/auth");
const users = require("../routes/users");
const error = require("../middleware/error");

function initRoutes(app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/foods", foods);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
}

module.exports = initRoutes;
