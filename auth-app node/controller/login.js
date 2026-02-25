const User = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        console.log("Login attempt for:", email);
        
        if(!email || !password) {
            console.log("Missing email or password");
            return res.status(400).json({message: "All fields are required"});
        }
        
        const existingUser = await User.findOne({email: email.toLowerCase().trim()});
        
        if(!existingUser) {
            console.log("User not found with email:", email);
            return res.status(400).json({message: "User with this email does not exist"});
        }
        
        console.log("User found, comparing passwords...");
        console.log("Stored password hash exists:", !!existingUser.password);
        
        const isMatch = await bcrypt.compare(password, existingUser.password);
        
        if(!isMatch) {
            console.log("Password mismatch for user:", email);
            return res.status(401).json({message: "Invalid credentials"});
        }
        
        console.log("Password matched, generating token...");
        
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

        console.log("Login successful for:", email);
        
        return res.status(200).json({
            status: "success", 
            message: "Login successful",
            token: token,
            user: {
                id: existingUser._id,
                email: existingUser.email,
                name: existingUser.name,
                role: existingUser.role
            }
        });
        
    } catch(error) {
        console.error("Login error:", error);
        return res.status(500).json({message: "Internal server error", error: error.message});
    }
}

module.exports = {login};
