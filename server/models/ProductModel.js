const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  packSize: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
});

module.exports = mongoose.model("categories", categorySchema);
