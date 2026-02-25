const User = require("../model/user")

// Return users who don't have an assigned role (null, empty string, or missing)
noroleuser = async (req, res) => {
    try {
        const users = await User.find({
            $or: [
                { role: null },
                { role: "" },
                { role: { $exists: false } }
            ]
        });
        res.status(200).json({ status: "success", data: users });
    } catch (err) {
        console.error("Failed to retrieve users without roles:", err);
        res.status(500).json({ status: "error", message: "Failed to retrieve users without roles", error: err.message });
    }
}

module.exports = { noroleuser }