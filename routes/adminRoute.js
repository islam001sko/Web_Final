const express = require('express');
const User = require('../models/userModel');
const { addUser, deleteUser, editUser, updateUser } = require('../controllers/adminController');
const router = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.admin) {
        next();
    } else {
        res.redirect('/login'); // Or handle the response appropriately
    }
}

router.get('/', isAdmin, async (req, res) => {
    const users = await User.find();
    res.render('admin', { users });
});

router.get('/edit-user/:userId', isAdmin, editUser);

// Use PUT for updating users
router.put('/update-user/:userId', isAdmin, updateUser);

router.post('/add-user', isAdmin, addUser);

// Use DELETE for removing users
router.delete('/delete-user/:userId', isAdmin, deleteUser);

module.exports = router;
