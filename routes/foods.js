const joi = require("joi");
const express = require("express");
const { Food } = require("../models/Food");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Category } = require("../models/Category");
const User = require("../models/User");
const router = express.Router();

router.get("/me", async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).send("User not found");

  return res.send(user);
});

router.get("/", async (req, res) => {
  const foods = await Food.find();
  return res.send(foods);
});

router.get("/:id", [auth, admin], async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  return res.send(food);
});

router.post("/", async (req, res) => {
  const { error } = validateFood(req.body);

  if (error) return res.status(404).send(error.message);

  const category = await Category.findOne({ name: req.body.category });

  // if-sats för att samma category inte ska sparas mer än en gång i db
  if (!category) {
    res.status(404).send("The category witht he given id was not found");
  }

  const newFood = new Food({
    ...req.body,
    category: category._id,
  });

  await newFood.save();

  return res.send(newFood);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validateFood(req.body);

  if (error) return res.status(404).send(error.message);

  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!food)
    return res.status(404).send("The food with the given id was not found");

  return res.send(food);
});

router.delete("/:id", [auth, admin], async (req, res) => {
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
