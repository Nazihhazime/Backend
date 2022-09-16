const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
});

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

const Food = mongoose.model("food", foodSchema);
const Category = mongoose.model("Category", categorySchema);

module.exports.Food = Food;
module.exports.Category = Category;
