const User = require("../model/user");

updateRole=async (req,res)=>{
    try{
        const {userId, role} = req.body;
        if(!userId || !['MENTOR','MENTEE'].includes(role)){
            return res.status(400).json({status:"error", message :"Invalid Data"});
        }
        const updateUser= await User.findByIdAndUpdate(userId,{role:role},{new:true});
        if(!updateUser){
            return res.status(404).json({status:"error", message:"User not found"});
        }
        res.status(200).json({status:"success", message:"Role updated successfully", data:updateUser});
    }catch(err){
        res.status(500).json({status:"error", message:"Server error"});
    }
}
module.exports={updateRole}