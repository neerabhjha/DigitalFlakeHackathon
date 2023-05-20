const {
  signupController,
  loginController,
  getCurUserController,
} = require("../controllers/UserController");
const requireUser = require("../middlewares/requireUser");

const router = require("express").Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/getCurrentUser", requireUser, getCurUserController);

module.exports = router;
