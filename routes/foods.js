const joi = require("joi");
const express = require("express");
const { Food } = require("../models/food");
const { Category } = require("../models/category");
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

  existingCategory = await Category.findOne({ name: req.body.category });

  let newCategory = new Category({ name: req.body.category });

  // if-sats för att samma category inte ska sparas mer än en gång i db
  if (!existingCategory?.name) {
    newCategory = await newCategory.save();
  }

  const newFood = new Food({
    ...req.body,
    category: existingCategory?._id || newCategory._id,
    categoryName: newCategory.name,
  });

  try {
    await newFood.save();
  } catch (error) {
    console.log(error);
  }

  return res.send(newFood);
});

router.put("/:id", async (req, res) => {
  const { error } = validateFood(req.body);

  if (error) return res.status(404).send(error.message);

  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  return res.send(food);
});

router.delete("/:id", async (req, res) => {
  const food = await Food.findByIdAndDelete(req.params.id);

  if (!food)
    return res.status(404).send("The food with the given id was not found");

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
