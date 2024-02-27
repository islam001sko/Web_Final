const express = require('express');
const User = require('../models/userModel');
const PopularBook = require('../models/popularBook')
const { addUser, deleteUser, editUser, updateUser, deleteBook,updateBook,addBook,editBook} = require('../controllers/adminController');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/', isAdmin, async (req, res) => {
    const users = await User.find();
    const books = await PopularBook.find();
    res.render('admin', { users,books });
});

router.get('/edit-user/:userId', isAdmin, editUser);

// Use PUT for updating users
router.put('/update-user/:userId', isAdmin, updateUser);

router.post('/add-user', isAdmin, addUser);

// Use DELETE for removing users
router.delete('/delete-user/:userId', isAdmin, deleteUser);

router.post('/add-book', isAdmin, addBook);
router.get('/edit-book/:id', isAdmin, editBook);
router.put('/update-book/:id', isAdmin, updateBook); // Consider using PUT and method-override middleware
router.delete('/delete-book/:id', isAdmin, deleteBook);

module.exports = router;
