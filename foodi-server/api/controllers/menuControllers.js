const Menu = require("../models/Menu");

const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a new menu item
const postMenuItems = async (req, res) => {
  const newItem = req.body;
  try {
    const result = await Menu.create(newItem);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete menu item
const deleteMenuItems = async (req, res) => {
  const itemId = req.params.id;
  try {
    const deletedItem = await Menu.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res
        .status(404)
        .json({ message: "Item not found", status: "error" });
    }
    res
      .status(200)
      .json({ message: "Item deleted successfully!", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a single menu item
const singleMenuItems = async (req, res) => {
  const itemId = req.params.id;
  try {
    const Item = await Menu.findById(itemId);
    // console.log('single item', Item);

    res.status(200).json(Item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update single menu item
const updateSingleMenuItems = async (req, res) => {
  const itemId = req.params.id;
  const { name, recipe, image, category, price } = req.body;
  try {
    const updateItem = await Menu.findByIdAndUpdate(
      itemId,
      {
        name,
        recipe,
        image,
        category,
        price,
      },
      {
        new: true,
      }
    );
    if (!updateItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updateItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  postMenuItems,
  deleteMenuItems,
  singleMenuItems,
  updateSingleMenuItems,
};
