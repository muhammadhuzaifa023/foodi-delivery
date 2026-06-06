const Carts = require("../models/Carts");

// get carts using email
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Carts.find(query).exec();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a card when add to cart btn clicked
const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  // console.log('Product detail which have top add in cart', req.body);

  try {
    // existing menu items
    const existingCartItem = await Carts.findOne({ menuItemId });
    if (existingCartItem) {
      return res.status(400).json({
        message: "Product already exists in cart!",
        success: false,
        error: true,
      });
    }

    const cartItem = await Carts.create({
      menuItemId,
      name,
      recipe,
      image,
      price,
      quantity,
      email,
    });

    res.status(201).json({
      cartItem,
      message: "Item added successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a cart item
const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deleteCart = await Carts.findByIdAndDelete(cartId);
    if (!deleteCart) {
      return res.status(401).json({
        message: "Cart items not found",
        success: false,
        error: true,
      });
    }
    res.status(200).json({
      message: "Cart item deleted successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a cart item
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  try {
    const updateCart = await Carts.findByIdAndUpdate(
      cartId,
      { menuItemId, name, recipe, image, price, quantity, email },
      { new: true, runValidators: true }
    );
    if (!updateCart) {
      return res.status(404).json({
        message: "Cart items not found",
        success: false,
        error: true,
      });
    }
    res.status(200).json({
      updateCart,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single cart item
const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const singleCartItem = await Carts.findById(cartId);

    res.status(200).json({
      singleCartItem,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
};
