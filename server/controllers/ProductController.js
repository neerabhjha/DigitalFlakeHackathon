const Product = require("../models/ProductModel");
const cloudinary = require("../cloudinary");

const ProductController = async () => {
  try {
    const { name, packSize, price, status, category, image } = req.body;
    const owner = req._id;

    if (!name || !packSize || !price || !status || !category || !image) {
      return res.send({
        success: false,
        message: "All fields are required",
      });
    }

    //upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "digital-flake",
    });

    const newProduct = await Product.create({
      name,
      packSize,
      price,
      status,
      image: uploadedImage.secure_url,
      category,
      owner,
    });
    return res.send({
      data: newProduct,
      message: "Product added successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      message: e.message,
      success: false,
    });
  }
};

module.export = { ProductController };
