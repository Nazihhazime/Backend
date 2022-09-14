const joi = require("joi");
const express = require("express");
const router = express.Router();

const categories = [
  { _id: "1", name: "Fruit" },
  { _id: "2", name: "Snacks" },
  { _id: "3", name: "Vegetables" },
];

router.get("", (req, res) => {
  return res.send(categories);
});

router.get("/:id", (req, res) => {
  const category = categories.find((f) => f._id === req.params.id);

  if (!category)
    return res.status(404).send("The category with the given id was not found");

  return res.send(category);
});

router.post("/", (req, res) => {
  const { error } = validateCategory(req.body);

  if (error) return res.status(404).send(error.message);

  const category = {
    id: "4",
    name: req.body.name,
  };

  categories.push(category);

  return res.send(categories);
});

router.put("/:id", (req, res) => {
  const { error } = validateCategory(req.body);

  if (error) return res.status(404).send(error.message);

  const category = categories.find((f) => f._id === req.params.id);

  if (!category)
    return res.status(404).send("The category with the given id was not found");

  category.name = req.body.name;

  return res.send(category);
});

router.delete("/:id", (req, res) => {
  const category = categories.find((f) => f._id === req.params.id);

  if (!category)
    return res.status(404).send("The category with the given id was not found");

  const index = categories.indexOf(category);
  categories.splice(index, 1);

  return res.send(category);
});

function validateCategory(category) {
  const schema = joi.object({
    name: joi.string().required(),
  });
  return schema.validate(category);
}

module.exports = router;
