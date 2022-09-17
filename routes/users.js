const express = require("express");
const bcrypt = require("bcrypt");
const { validate, User } = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("User already registered");

  const user = new User(req.body);
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  user.save();

  return res.status(201).send(user);
});

module.exports = router;
