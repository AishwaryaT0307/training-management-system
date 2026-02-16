const mongoose= require('mongoose');
const userDetailsSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    id:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        minLength:6
    },
    role:{
        type:String,
        required:true,
        enum:['mentee','mentor','manager'],
        default:'mentee'
    },
    techstack:{
        type:String,
        trim:true
    },
    mentorID:{
        type:String
    }
    
},{timestamps:true});

const User= mongoose.model('User',userDetailsSchema);
module.exports=User;