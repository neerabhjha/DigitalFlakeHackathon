const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//User Registration
const signupController = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log(req.body);

    if (!email || !name || !password) {
      return res.send({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.send({
        message: "User already exists",
        success: false,
      });
    }
    //create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.send({
      data: newUser,
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};

//User Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User doesn't exists",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });

    return res.send({
      success: true,
      message: "Login successful",
      data: accessToken,
    });
  } catch (e) {
    return res.send({
      message: e.message,
      success: false,
    });
  }
};

// Get data of logged in User
const getCurUserController = async (req, res) => {
  try {
    const user = await User.findById(req._id).populate("products categories");
    return res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};

//internal function to generate access token
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};

module.exports = { signupController, loginController, getCurUserController };
