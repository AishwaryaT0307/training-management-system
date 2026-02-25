const User = require("../model/user")

noroleuser=async (req,res)=>{
    try{
       const users=await User.find({role:null});
       res.status(200).json({status:"success",data:users});
    }catch(err){
        res.status(500).json({status:"error",message:"Failed to retrieve users without roles"});
    }
}
module.exports={noroleuser}