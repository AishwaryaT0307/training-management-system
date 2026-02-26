const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Safely load controllers - they may be on different branches
const loadController = (path) => {
    try {
        return require(path);
    } catch (e) {
        console.warn(`Controller not found: ${path}`);
        return null;
    }
};

const { register } = loadController('./controller/register') || {};
const { login } = loadController('./controller/login') || {};
const { home } = loadController('./controller/home') || {};
const { checkRole } = loadController('./controller/checkRole') || {};
const { noroleuser } = loadController('./controller/noroleuser') || {};
const { updateRole } = loadController('./controller/updateRole') || {};

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth-app';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

//Register API
if (register) app.post("/api/register", register);

//Login API
if (login) app.post("/api/login", login);

//Home API
if (home) app.get("/api/home", home);

//Logout API
app.post("/api/logout",(req,res)=>{
    res.clearCookie("token");
    return res.status(200).json({status:"success",message:"Logged out successfully!"});
})

//Role-based access control
if (checkRole) app.get("/api/check", checkRole);

//Get users without roles
if (noroleuser) app.get("/api/getNoRoleUsers", noroleuser);

//Update user role
if (updateRole) app.patch("/api/updateRole", updateRole);

//get all mentees
app.get("/api/mentees", getMentees);

//Assign Tech Stack to mentees
app.patch("/api/assignTechStack", assignTechStack);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));