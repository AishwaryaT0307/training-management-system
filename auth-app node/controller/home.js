const User = require('../model/user');
const jwt = require('jsonwebtoken');


home=async(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({status:"error",message:"No token Found!"});
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    let verify=jwt.verify(token,JWT_SECRET);
    if(!verify || !verify.id){
        return res.status(401).json({status:"error",message:"Invalid token!"});
    }
    const user=await User.findById(verify.id).select("-password");
    if(!user){
        return res.status(404).json({status:"error",message:"User not found!"});
    }
    return res.status(200).json({status:"success",message:"Welcome to the Home Page!",data:user});

}
module.exports = {home};
