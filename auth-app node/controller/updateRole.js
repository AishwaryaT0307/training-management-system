const User = require("../model/user");

updateRole=async (req,res)=>{
    try{
        const {userId, role} = req.body;
        
        if(!userId || !role){
            return res.status(400).json({status:"error", message :"User ID and role are required"});
        }
        
        // Normalize role to lowercase
        const roleLower = role.toLowerCase().trim();
        
        if(!['mentor','mentee','manager'].includes(roleLower)){
            return res.status(400).json({status:"error", message :"Invalid role. Must be mentor, mentee, or manager"});
        }
        
        const updateUser = await User.findByIdAndUpdate(userId, {role: roleLower}, {new:true});
        
        if(!updateUser){
            return res.status(404).json({status:"error", message:"User not found"});
        }
        
        res.status(200).json({status:"success", message:"Role updated successfully", data:updateUser});
    }catch(err){
        console.error("Error updating role:", err);
        res.status(500).json({status:"error", message:"Server error"});
    }
}
module.exports={updateRole}