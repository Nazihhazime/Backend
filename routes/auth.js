const express = require("express");
const { Joi } = require("joi");
const { User } = require("../models/User");
const router = express.Router();

router.post("/", async (req, ress) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) return res.status(400).send("Invalid email or Password");
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string.email().required(),
    password: Joi.string.min(5).required(),
  });

  return schema.validte(user);
}

modeule.exports = router;
