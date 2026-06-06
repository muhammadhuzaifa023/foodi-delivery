const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  price: Number,
  quantity: Number,
  email: {
    type: String,
  },
});

// create models
const Carts = mongoose.model("Cart", cartSchema);
module.exports = Carts;
