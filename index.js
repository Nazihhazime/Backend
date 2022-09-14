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

async function createFood(food) {
  const newFood = new Food(food);

  try {
    await newFood.save();
  } catch (error) {
    console.log(error);
  }
}

async function getFoods() {
  console.log(foods);
}

async function getOneFood(id) {
  const foods = await Food.findById(id);
  console.log(foods);
}

async function updateFood(id) {
  await Food.findByIdAndUpdate(id, {
    name: "banan",
    category: "Fruit",
    numberInStock: 3,
    price: 5,
  });
}

async function deleteOneFood(id) {
  await Food.findByIdAndDelete(id);
  console.log(foods);
}

app.listen(8000, () => {
  console.log("listening on port 8000...");
});
