const express = require("express");
const Menu = require("../models/Menu");
const { getAllMenuItems, postMenuItems, deleteMenuItems, singleMenuItems, updateSingleMenuItems } = require("../controllers/menuControllers");
const router = express.Router();

// get all menu items
router.get("/", getAllMenuItems);
// post a menu items
router.post("/", postMenuItems);
// delete a menu items
router.delete("/:id", deleteMenuItems);
// get a single menu items
router.get("/:id", singleMenuItems);
// update a single menu items
router.patch("/:id", updateSingleMenuItems);

module.exports = router;
