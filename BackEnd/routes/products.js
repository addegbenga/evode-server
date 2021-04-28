const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    createProduct,
    getProductById,
    editProduct,
  } = require("../controllers/product");
  
  router.get("/all", getAllProducts);
  router.post("/create", createProduct);
  router.get("/:id", getProductById);
  router.put("/edit/:id", editProduct);

module.exports = router;
