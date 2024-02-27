const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    deletedAt: { type: Date, default: null },
    favorites: [{
        type: String, // or String if storing Google Books API book IDs
        ref: 'Book' // Only needed if you're referencing documents stored in your own database
    }]
}, { timestamps: true })

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;