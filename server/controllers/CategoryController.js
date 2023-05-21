const Category = require("../models/CategoryModel");
const User = require("../models/UserModel");

const categoryController = async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, status } = req.body;
    const owner = req._id;
    const user = await User.findById(req._id);

    // check if all fields are available or not
    if (!name || !status || !description) {
      return res.send({
        success: false,
        message: "All fields are required",
      });
    }

    // creating new category
    const newCategory = await Category.create({
      name,
      description,
      status,
      owner,
    });

    //pushing category in the user's category array.
    user.categories.push(newCategory._id);
    await user.save();

    return res.send({
      data: newCategory,
      message: "Category created successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.body;
    // delete product from the user's array
    const user = await User.findById(req._id);
    const index = user.categories.indexOf(categoryId);
    user.categories.splice(index, 1);
    await user.save();

    // delete the category
    await Category.deleteOne({ _id: categoryId });
    return res.send({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { categoryController, deleteCategoryController };
