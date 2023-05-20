const { ProductController } = require("../controllers/ProductController");
const requireUser = require("../middlewares/requireUser");

const router = require("express").Router();

router.post("/createProuct", requireUser, ProductController);

module.exports = router;
