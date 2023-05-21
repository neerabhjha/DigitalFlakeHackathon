const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const cloudinary = require("../cloudinary");

const ProductController = async (req, res) => {
  try {
    const { name, packSize, price, status, category, image } = req.body;
    const owner = req._id;
    const user = await User.findById(req._id);

    if (!name || !packSize || !price || !status || !category) {
      return res.send({
        success: false,
        message: "All fields are required",
      });
    }

    // upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "digital-flake",
    });

    //creating new product
    const newProduct = await Product.create({
      name,
      packSize,
      price,
      status,
      image: uploadedImage.secure_url,
      category,
      owner,
    });

    //pushing product in the user's product array
    user.products.push(newProduct._id);
    await user.save();

    return res.send({
      data: newProduct,
      message: "Product added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
      success: false,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.body;
    // delete product from the user's array
    const user = await User.findById(req._id);
    const index = user.products.indexOf(productId);
    user.products.splice(index, 1);
    await user.save();

    // delete the product
    await Product.deleteOne({ _id: productId });
    return res.send({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { ProductController, deleteProductController };
