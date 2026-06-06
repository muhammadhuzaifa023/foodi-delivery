const express = require("express");
const {
  addPaymentInfoToDb,
  getallUserOrders,
  getAllPayments,
  updateOrderStatus,
} = require("../controllers/paymentController");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

// post payment info to db
router.post("/", verifyToken, addPaymentInfoToDb);
// getting user orders
router.get("/", verifyToken, getallUserOrders);

// admin only routes
router.get("/all", verifyToken, getAllPayments);
router.patch("/:id", verifyToken, isAdmin, updateOrderStatus);

module.exports = router;
