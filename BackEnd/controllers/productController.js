const Product = require("../models/Product");
const User = require("../models/User");

class ProductController {
    async getAllProducts(req, res) {
        try {
          let product = await Product.find();
          return res.json({ msg: "Success", data: product });
        } catch (error) {
          console.log(error);
          return res.json({ error: "Server error" });
        }
    }

    async getOneProduct(req, res) {
        try {
          let product = await Product.findById(req.params.id);
          if (!product) {
            return res.json({ error: "no product found" });
          }
          return res.json({ msg: "success", data: product });
        } catch (error) {
          console.log(error);
        }
    }

    async createProduct(req, res) {
        try {
          const user = await User.findById(req.user.id);
          if (!user) {
            return res.json({
              error: "you must be authenticated to perform this action",
            });
          }
          const newProduct = new Product({
            productAuthor: req.user.id,
            productImage: req.body.productImage,
            productName: req.body.productName,
            productCategory: req.body.productCategory,
            productPrice: req.body.productPrice,
            productQuantity: req.body.productQuantity,
            productDescription: req.body.productDescription,
            productSold: req.body.productSold,
          });

          const response = await newProduct.save();

          return res.json({ msg: "Product created succesfully", data: response });

        } catch (error) {
          return res.json("Server Error");
        }
    }

    async updateProduct(req, res) {
        const fieldToUpdate = {
          productImage: req.body.productImage,
          productName: req.body.productName,
          productCategory: req.body.productCategory,
          productPrice: req.body.productPrice,
          productQuantity: req.body.productQuantity,
          productDescription: req.body.productDescription,
          productSold: req.body.productSold,
        };
        try {
          let user = await User.findById(req.user.id);
          let product = await Product.findById(req.params.id);
          if (!user) {
            return res.json({ error: "user not allowed to perfoem this operation" });
          }
          if (!product) {
            return res.json({ error: "product not found" });
          }
      
          product = await Product.findByIdAndUpdate(req.params.id, fieldToUpdate, {
            new: true,
            runValidators: true,
          });
          return res.json({ msg: "success", data: product });
        } catch (error) {
          console.log(error);
          return res.json({ error: "server error" });
        }
    }
}

module.exports = new ProductController();