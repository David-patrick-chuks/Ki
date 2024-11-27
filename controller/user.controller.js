const User = require("../model/user.model.js");
const { passwordHasher } = require("../utils/helper.js");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  try {
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check for existing user with the same email or phone using the $or operator.
    // This queries the database for a match on either email or phone.
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email or phone already exists." });
    }

    const hashedPassword = await passwordHasher(password);
    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    // Handle duplicate key error for unique email and phone fields.
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `Duplicate value for ${field}.` });
    }
    console.log(error);
    next(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({
      status: "failed",
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({
      status: "failed",
      message: "Invalid password",
    });
  }
  res.json({
    status: "successful",
    message: "Welcome",
  });
};
module.exports = {
  registerUser,
  loginUser,
};
