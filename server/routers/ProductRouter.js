const {
  ProductController,
  deleteProductController,
} = require("../controllers/ProductController");
const requireUser = require("../middlewares/requireUser");

const router = require("express").Router();

router.post("/createProduct", requireUser, ProductController);
router.delete("/deleteProduct", requireUser, deleteProductController);

module.exports = router;
