const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const foods = require("./routes/foods");
const categories = require("./routes/categories");
const auth = require("./routes/auth");
const users = require("./routes/users");
const { use } = require("./routes/users");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/foods", foods);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

mongoose
  .connect("mongodb://localhost/myown-intensive-foods")
  .then(() => console.log("connect to MongoDB"))
  .catch((error) => console.log("could not connect...", error));

app.listen(8000, () => {
  console.log("listening on port 8000...");
});
