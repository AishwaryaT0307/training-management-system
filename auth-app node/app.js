const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth-app';

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.post("/api/register", async(req,res)=>
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
        role: 'mentee'
    });
    res.status(201).json({message:"User registered successfully", user:{name:newUser.name, id:newUser.id, email:newUser.email}});
    }
    catch(error){
        console.error("Error during registration:", error);
        res.status(500).json({message:"Server error"});
    }
})



const PORT= process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));


  