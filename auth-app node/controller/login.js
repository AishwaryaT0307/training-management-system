const User = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        const existingUser = await User.findOne({email: email});
        if(!existingUser) {
            return res.status(400).json({message: "User with this email does not exist"});
        }
        
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        
        const token = jwt.sign(
            {id: existingUser._id, email: existingUser.email}, 
            process.env.JWT_SECRET, 
            {expiresIn: "1h"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            status: "success", 
            message: "Login successful",
            token: token
        });
        
    } catch(error) {
        return res.status(500).json({message: "Internal server error", error: error.message});
    }
}

module.exports = {login};