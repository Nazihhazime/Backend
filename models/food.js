const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  name: String,
  categoryName: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  numberInStock: Number,
  price: Number,
});

// const foodSchema = mongoose.Schema({
//   name: String,
//   categoryName: String,
//   category: categorySchema,
//   numberInStock: Number,
//   price: Number,
// });

const Food = mongoose.model("food", foodSchema);

module.exports.Food = Food;
