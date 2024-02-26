const express = require('express');
const { login, signup,getLogin,addFavoriteBook,viewFavorites} = require('../controllers/userController.js');

const router = express.Router()

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        // Redirect to login page or send an error
        // return res.redirect('/login');
        return res.status(401).send('You must be logged in to perform this action.');
    }
};

router.get('/login', getLogin);
router.post("/signup", signup);
router.post("/login", login);
router.post('/add-to-favorites/:id', isAuthenticated, addFavoriteBook);
router.get('/favorites', isAuthenticated, viewFavorites);


module.exports = router;
