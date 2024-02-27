const User = require("../models/userModel.js");
const Book = require("../models/bookModel.js")
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    } catch (err) {
        return console.log(err)
    }
    if (existingUser) {
        return res.status(400).json({ message: "user already exists" })
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await user.save();
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        req.session.save(err => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session error, please try again." });
            }
            res.redirect('/home');
        });
    } catch (err) {
        return console.log(err)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.redirect('/login');
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.redirect('/login');
        }

        req.session.user = { id: existingUser._id, admin: existingUser.isAdmin, username: existingUser.username };

        req.session.save(err => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session error, please try again." });
            }
            return res.redirect(existingUser.isAdmin ? '/admin' : '/home');
        });
    } catch (err) {
        res.redirect('/login');
    }
}
const getLogin = async (req, res, next) => {
    res.render('login');
}

const addFavoriteBook = async (req, res) => {
    const userId = req.session.user.id; // Assuming the user ID is stored in the session
    const bookId = req.params.id; // The ID of the book to add to favorites
    try {
        // Add the book to the user's favorites
        const user = await User.findById(userId);
        if (!user.favorites.includes(bookId)) {
            user.favorites.push(bookId);
            await user.save();

            res.redirect('/favorites'); // Redirect to a page showing the user's favorites
        } else {
            res.status(400).send('Book already in favorites');
        }

    } catch (error) {
        console.error('Error adding favorite book:', error);
        res.status(500).send('Error updating favorites');
    }
};

const viewFavorites = async (req, res) => {
    const userId = req.session.user.id; 
    console.log("User ID:", userId);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const books = await Book.find({
            'id': { $in: user.favorites } 
        });

        res.render('favorites', { favorites: books, user: req.session.user });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).send('Error fetching favorites');
    }
};

const deleteFavorites = async (req, res) => {
    const userId = req.session.user.id;
    const bookId = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { favorites: bookId } }, 
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).send("User not found.");
        }
        res.redirect('/favorites');
    } catch (error) {
        console.error("Error removing book from favorites:", error);
        res.status(500).send("An error occurred.");
    }
}

module.exports = {
    signup,
    login,
    getLogin,
    addFavoriteBook,
    viewFavorites,
    deleteFavorites
};