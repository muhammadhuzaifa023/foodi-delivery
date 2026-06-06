const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
  getAdminStats,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/isAdmin");
const router = express.Router();

router.get("/", verifyToken, getAllUsers);
router.post("/", createUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);
router.get("/admin/:email", verifyToken, getAdmin);
router.patch("/admin/:id", verifyToken, verifyAdmin, makeAdmin);

// get stats
router.get("/stats", verifyToken, getAdminStats);

module.exports = router;
