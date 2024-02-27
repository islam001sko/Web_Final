const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Ensure the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

router.get('/profile', isAuthenticated, profileController.getAllProfiles);
router.post('/share-news', isAuthenticated, profileController.shareNews);
module.exports = router;