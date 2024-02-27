// controllers/profileController.js
const User = require('../models/userModel');

exports.getAllProfiles = async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    try {
        const users = await User.find().select("-password"); // Exclude passwords for security
        res.render('profile', { users,isLoggedIn:isLoggedIn, user:req.session.user });
    } catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).send("An error occurred while fetching the profiles.");
    }
};

exports.shareNews = async (req, res) => {
    const { title, imageUrl, url } = req.body;
    try {
        await User.findByIdAndUpdate(req.session.user.id, {
            $push: { sharedNews: { title, imageUrl, url } }
        });
        res.json({ message: 'News shared successfully' });
    } catch (error) {
        console.error("Error sharing news:", error);
        res.status(500).send("An error occurred while sharing the news.");
    }
};