const mongoose = require("mongoose");
const Payment = require("../models/payments");
const Order = require("../models/Order");
const Carts = require("../models/Carts");
const ObjectId = mongoose.Types.ObjectId;

const addPaymentInfoToDb = async (req, res) => {
  const payment = req.body;
  try {
    const paymentRequest = await Payment.create(payment);

    // Also create an entry in the Order collection
    const orderRequest = await Order.create(payment);

    // delete cart after payment
    const cartIds = payment.cartItems.map((id) => new ObjectId(id));
    const deleteCartRequest = await Carts.deleteMany({ _id: { $in: cartIds } });

    res.status(200).json({ paymentRequest, orderRequest, deleteCartRequest });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getallUserOrders = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      return res.status(403).json({ message: "Forbidden Access" });
    }

    const result = await Order.find(query).sort({ createdAt: -1 }).exec();

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Admin panel get all payments
const getAllPayments = async (req, res) => {
  try {
    const result = await Order.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const updatedStatus = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true, runValidators: true }
    );
    if (!updatedStatus) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  addPaymentInfoToDb,
  getallUserOrders,
  getAllPayments,
  updateOrderStatus,
};
