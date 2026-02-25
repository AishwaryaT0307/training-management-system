User=require('../model/user');
bcrypt=require('bcryptjs');

register=async(req,res)=>
{
    try{
        const{name,id,email,password}=req.body;
        
        console.log("Register attempt for:", email, "with id:", id);
        
        if(!name || !id || !email || !password){
            console.log("Missing required fields");
            return res.status(400).json({message:"All fields are required"});
        }
        
        const emailLower = email.toLowerCase().trim();
        const idStr = String(id).trim();
        
        const existingUserByEmail = await User.findOne({email: emailLower});
        if(existingUserByEmail){
            console.log("User already exists with email:", email);
            return res.status(400).json({message:"User with this email already exists"});
        }
        
        const existingUserById = await User.findOne({id: idStr});
        if(existingUserById){
            console.log("User already exists with id:", id);
            return res.status(400).json({message:"User with this ID already exists"});
        }
        
        const hashedPass=await bcrypt.hash(password,10);
        
        const newUser= await User.create({
            name: name.trim(),
            id: idStr,
            email: emailLower,
            password:hashedPass,
            role: null
        });
        
        console.log("User registered successfully:", email);
        
        res.status(201).json({
            message:"User registered successfully", 
            user:{
                name:newUser.name, 
                id:newUser.id, 
                email:newUser.email
            }
        });
    }
    catch(error){
        console.error("Error during registration:", error);
        res.status(500).json({message:"Server error", error: error.message});
    }
}

module.exports={register};
