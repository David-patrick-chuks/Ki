const User = require("../model/user.model.js");
const { passwordHasher } = require("../utils/helper.js");
const registerUser = async (req, res, next) => {
    const { name, email, phone, password} = req.body;
    try {

        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required." });
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({ message: "User already exists." });
        }

        if(phone){
            const phoneExists = await User.findOne({mobile: phone});
            if (phoneExists){
                return res.status(400).json({ message: "Phone number already exists." });
            }
        }

        const hashedPassword = await passwordHasher(password);
        const user = new User({ name, email, mobile: phone, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully." });

        
    } catch (error) {
        next(error);
    }

}

const loginUser = () => {

}

module.exports = {
    registerUser,
    loginUser
}