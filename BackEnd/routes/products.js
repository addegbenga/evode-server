const express = require("express");
const router = express.Router();

const { auth, protect } = require("../middleware/verify");

const { getAllProducts, getOneProduct, createProduct, updateProduct } = require("../controllers/productController");


// Public route to get all products
router.get("/all", getAllProducts);

// Public route to get products by id
router.get("/:id", getOneProduct);

// Route to create a product by a user
router.post("/add", auth, protect("role1"), createProduct);

// Route to edit products
router.put("/edit/:id", auth, protect("role1"), updateProduct);

module.exports = router;
