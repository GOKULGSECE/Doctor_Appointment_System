const userModel = require("../models/userModels");
const bcrypt = require('bcrypt');

const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }
    const newUser = new userModel({
      name,
      email,
      password,
      role
    });
    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

const loginController = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role !== role || user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "Logged in successfully"});
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = { registerController, loginController};
