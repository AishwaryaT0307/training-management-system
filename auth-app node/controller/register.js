User=require('../model/user');
bcrypt=require('bcryptjs');

register=async(req,res)=>
{
    try{
        const{name,id,email,password}=req.body;
    if(!name || !id || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    const userId = Number(id);
    if(isNaN(userId)){
        return res.status(400).json({message:"ID must be a valid number"});
    }
    const existingUser= await User.findOne({id: userId});
    if(existingUser){
        return res.status(400).json({message:"User with this ID already exists"});
    }
    const hashedPass=await bcrypt.hash(password,10);
    const newUser= await User.create({
        name,
        id: userId,
        email,
        password:hashedPass,
        role: null
    });
    res.status(201).json({message:"User registered successfully", user:{name:newUser.name, id:newUser.id, email:newUser.email}});
    }
    catch(error){
        console.error("Error during registration:", error);
        res.status(500).json({message:"Server error"});
    }
}
module.exports={register};