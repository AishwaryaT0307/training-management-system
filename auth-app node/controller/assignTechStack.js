const User = require("../model/user");

assignTechStack=async (req, res) => {
    try{
        const {userId, techstack} = req.body;
        if(!userId || !techstack){
            return res.status(400).json({status:"error", message:"Missing data"});
        }
        const updateUser= await User.findByIdAndUpdate(userId, {techstack: techstack}, {new:true});
        if(!updateUser){
            return res.status(404).json({status:"error", message:"User not found"});
        }
        res.status(200).json({status:"success", message:"Tech stack assigned successfully", data:updateUser});
    }catch(err){
        console.error("Error assigning tech stack:", err);
        res.status(500).json({status:"error", message:"Server error"});
    }
}
module.exports={assignTechStack}