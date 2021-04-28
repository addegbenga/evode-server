const express = require("express");
const router = express.Router();
const {
  allProduct,
  createProduct,
  getProductById,
  editProduct,
} = require("../controllers/products");

router.get("/all", allProduct);
router.post("/create", createProduct);
router.get("/:id", getProductById);
router.put("/edit/:id", editProduct);

module.exports = router;
