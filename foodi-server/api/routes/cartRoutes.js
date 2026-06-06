const express = require("express");
const Carts = require("../models/Carts");
const {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
} = require("../controllers/cartControllers");
const router = express.Router();

router.get("/", getCartByEmail);
router.post("/", addToCart);
router.delete("/:id", deleteCart);
router.put("/:id", updateCart);
router.get("/:id", getSingleCart);

module.exports = router;
