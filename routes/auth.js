const express = require("express");
const { Joi } = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: req.body.email });
  if (!existingUser) return res.status(400).send("Invalid email or password");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (isValid) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  return res.send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string.email().required(),
    password: Joi.string.min(5).required(),
  });

  return schema.validte(user);
}

module.exports = router;
