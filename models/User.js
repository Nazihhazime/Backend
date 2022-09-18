const Joi = require("joi");
const { mongoose } = require("mongoose");
require("mongoose-type-email");

const userSchema = mongoose.Schema({
  name: { type: String, minlength: 2 },
  email: { type: mongoose.SchemaTypes.Email, required: true },
  password: { type: String, minlength: 5, required: true },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().allow("").min(2),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validate: validateUser,
};
