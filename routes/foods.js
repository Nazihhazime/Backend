const joi = require("joi");
const express = require("express");
const router = express.Router();

const foods = [
  { _id: "1", name: "Apple", category: "Fruit" },
  { _id: "2", name: "Chips", category: "Snacks" },
  { _id: "3", name: "Salad", category: "Vegetables" },
];

router.get("", (req, res) => {
  return res.send(foods);
});

router.get("/:id", (req, res) => {
  const food = foods.find((f) => f._id === req.params.id);

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  return res.send(food);
});

router.post("/", (req, res) => {
  const { error } = validateFood(req.body);

  if (error) return res.status(404).send(error.message);

  const food = {
    id: "4",
    name: req.body.name,
    category: req.body.category,
  };

  foods.push(food);

  return res.send(foods);
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
  });
  return schema.validate(food);
}

module.exports = router;
