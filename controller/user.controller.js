const User = require("../model/user.model.js");
const { passwordHasher } = require("../utils/helper.js");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
    const { name, email, password, phone} = req.body;
    try {

        if(!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await passwordHasher(password);
        const user = new User({ name, email, password: hashedPassword, phone });
        await user.save();
        res.status(201).json({ message: "User registered successfully." });
        
    } catch (error) {
        console.log(error)
        next(error);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  
  const user = await User.findOne({email});
  if(!user){
      return res.status(403).json({
          status: "failed",
          message: "User not found"
      });
  }
  
  
  const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
          return res.status(403).json({
              status: "failed",
              message: "Invalid password"
          });
      }
      res.json({
              status: "successful",
              message: "Welcome"
          });
  }
  module.exports = {
    registerUser,
    loginUser,
  };