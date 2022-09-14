const foodSchema = mongoose.Schema({
  name: String,
  category: String,
  numberInStock: Number,
  price: Number,
});

const Food = mongoose.model("food", foodSchema);

module.exports.Food = Food;
