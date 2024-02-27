const User = require('../models/userModel');
const PopularBook = require('../models/popularBook');
const bcrypt = require('bcryptjs');

const addUser = async (req, res) => {
    try {
        const { username, email, password, admin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
            admin: !!admin,
        });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.send('Error adding user');
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.send('Error deleting user');
    }
};

const editUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('editUser', { user });
    } catch (error) {
        console.error(error);
        res.send('Error fetching user details');
    }
};

const updateUser = async (req, res) => {
    const { username, email, admin } = req.body;
    try {
        await User.findByIdAndUpdate(req.params.userId, {
            username,
            email,
            admin: !!admin, // Convert to boolean
        });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.send('Error updating user');
    }
};

// Function to add a new book from the admin panel
const addBook = async (req, res) => {
    try {
        const { category, title, author, image } = req.body;
        await new PopularBook({ category, title, author, image }).save();
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send("Error adding book: " + error.message);
    }
};

// Function to show the edit form for a single book
const editBook = async (req, res) => {
    try {
        const book = await PopularBook.findById(req.params.id);
        if (!book) return res.status(404).send("Book not found.");
        res.render('/admin', { book }); // Assuming an EJS template under /views/admin/edit-book.ejs
    } catch (error) {
        res.status(500).send("Error fetching book: " + error.message);
    }
};

// Function to update a book's details
const updateBook = async (req, res) => {
    try {
        const { category, title, author, image } = req.body;
        await PopularBook.findByIdAndUpdate(req.params.id, { category, title, author, image });
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send("Error updating book: " + error.message);
    }
};

// Function to delete a book
const deleteBook = async (req, res) => {
    try {
        await PopularBook.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send("Error deleting book: " + error.message);
    }
};

module.exports = {
    addUser,
    deleteUser,
    editUser,
    updateUser,
    deleteBook,
    updateBook,
    addBook,
    editBook,
};