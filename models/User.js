const Joi = require("joi");

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(user);
}

module.exports.validate = validateUser;
