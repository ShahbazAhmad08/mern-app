const bcrypt = require("bcrypt");
const UserModel = require("../Models/user");
const jwt = require("jsonwebtoken");

const singup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "user is already exist, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "SingUp Successfully...", success: true });
  } catch {
    (err) => {
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    };
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errMessage = "Auth failed email or password  is wrong";
    if (!user) {
      return res.status(403).json({
        message: errMessage,
        success: false,
      });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({
        message: errMessage,
        success: false,
      });
    }
    const jwToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "login Successfully...",
      success: true,
      jwToken,
      email,
      name: user.name,
    });
  } catch {
    (err) => {
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    };
  }
};

module.exports = {
  singup,
  login,
};
