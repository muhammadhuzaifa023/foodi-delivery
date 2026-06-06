const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  transitionId: String,
  email: String,
  price: Number,
  quantity: Number,
  status: String,
  itemName: Array,
  cartItems: Array,
  menuItems: Array,
  orderItems: [
    {
      menuItemId: String,
      name: String,
      price: Number,
      image: String,
      quantity: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
