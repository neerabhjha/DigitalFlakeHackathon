const {
  categoryController,
  deleteCategoryController,
} = require("../controllers/CategoryController");
const requireUser = require("../middlewares/requireUser");

const router = require("express").Router();

router.post("/createCategory", requireUser, categoryController);
router.delete("/deleteCategory", requireUser, deleteCategoryController);

module.exports = router;
