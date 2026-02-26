const User = require("../model/user");


getMentees=async (req, res) => {
    try{
        const mentees = await User.find({role:"mentee"});
        res.status(200).json({status:"success", data:mentees});
    }catch(err){
        console.error("Error fetching mentees:", err);
        res.status(500).json({status:"error", message:"Server error"});
    }
}
module.exports={getMentees}