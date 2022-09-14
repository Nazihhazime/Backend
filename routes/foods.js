const joi = require("joi");
const express = require("express");
const { Food } = require("../models/food");
const router = express.Router();

router.get("", async (req, res) => {
  const foods = await Food.find();
  return res.send(foods);
});

router.get("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  return res.send(food);
});

router.post("/", async (req, res) => {
  const { error } = validateFood(req.body);

  if (error) return res.status(404).send(error.message);

  const newFood = new Food(req.body);

  try {
    await newFood.save();
  } catch (error) {
    console.log(error);
  }

  return res.send(newFood);
});

router.put("/:id", (req, res) => {
  const { error } = validateFood(req.body);

  if (error) return res.status(404).send(error.message);

  const food = foods.find((f) => f._id === req.params.id);

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  food.name = req.body.name;
  food.category = req.body.category;

  return res.send(food);
});

router.delete("/:id", (req, res) => {
  const food = foods.find((f) => f._id === req.params.id);

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  const index = foods.indexOf(food);
  foods.splice(index, 1);

  return res.send(food);
});

function validateFood(food) {
  const schema = joi.object({
    name: joi.string().required(),
    category: joi.string().required(),
    price: joi.number().required(),
    numberInStock: joi.number().required(),
  });
  return schema.validate(food);
}

module.exports = router;
