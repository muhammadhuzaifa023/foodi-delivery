const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
  transitionId: String,
  email: String,
  price: Number,
  quantity: Number,
  status: String,
  itemName: Array,
  cartItems: Array,
  menuItems: Array,
  orderItems: Array, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create models
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
