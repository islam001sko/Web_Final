const express = require('express');
const { login, signup,getLogin,addFavoriteBook,viewFavorites,deleteFavorites} = require('../controllers/userController.js');
const isAuthenticated = require('../middleware/isAuthenticated.js')
const methodOverride = require('method-override');


const router = express.Router()
router.use(methodOverride('_method'));


router.get('/login', getLogin);
router.post("/signup", signup);
router.post("/login", login);
router.post('/add-to-favorites/:id', isAuthenticated, addFavoriteBook);
router.delete('/favorites/delete-favorites/:id', isAuthenticated, deleteFavorites);
router.get('/favorites', isAuthenticated, viewFavorites);


module.exports = router;
