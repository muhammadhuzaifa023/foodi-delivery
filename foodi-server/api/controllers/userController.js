const User = require("../models/User");
const Menu = require("../models/Menu");
const Payment = require("../models/payments");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post new user
const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const existingUsers = await User.findOne(query);
    if (existingUsers) {
      return res.status(302).json({ message: "User already exists!" });
    }
    const result = await User.create(user);
    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    // if(!deletedUser){
    //     return res.status(404).json({message: "User not found!"})
    // }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get admin
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await User.findOne(query);
    if (email !== req.decoded.email) {
      return res
        .status(403)
        .json({ message: "Forbidden access", error: true, success: false });
    }
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// make admin of user
const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  const { name, email, photoURL, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get admin stats
const getAdminStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const menuItems = await Menu.countDocuments();
    const orders = await Payment.countDocuments();

    const payments = await Payment.find();
    const revenue = payments.reduce((sum, payment) => sum + payment.price, 0);

    res.status(200).json({
      users,
      menuItems,
      orders,
      revenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
  getAdminStats,
};
