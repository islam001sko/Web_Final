const axios = require('axios');
const Book = require('../models/bookModel');
const PopularBook = require('../models/popularBook')

exports.searchBooks = async (req, res) => {
    try {
        const { title } = req.query;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=AIzaSyCRBcTduN9KhnY9W_fJunhyhl0O_m9eWZw`);
        const booksData = response.data.items;
        const popularBooks = await PopularBook.find();

        const books = await Promise.all(booksData.map(async (book) => {
            // Check if the book already exists in the database
            let foundBook = await Book.findOne({ id: book.id });
            if (!foundBook) {
                // If the book is not found, create a new one in the database
                foundBook = await Book.create({
                    id: book.id,
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors || [],
                    averageRating: book.volumeInfo.averageRating,
                    pageCount: book.volumeInfo.pageCount,
                    description: book.volumeInfo.description,
                    image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
                });
            }
            return foundBook; // Return the found or newly created book
        }));

        res.render('books', { books, user: req.session.user,popularBooks });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
};


exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('admin', { books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
};


exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render('editBook', { book });
    } catch (error) {
        console.error('Error finding book:', error);
        res.status(500).send('Error finding book');
    }
};


exports.updateBook = async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, {
            $set: {
                id: book.id,
                title: req.body.title,
                authors: req.body.authors,
                averageRating: book.volumeInfo.averageRating,
                pageCount: book.volumeInfo.pageCount,
                description: req.body.description,
                image: req.body.image,
            },
        });
        res.redirect('/admin/books');
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('Error updating book');
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndRemove(req.params.id);
        res.redirect('/admin/books');
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
};

exports.bookDetails = async (req, res) => {
    const bookId = req.params.id;
    const isLoggedIn = req.session.user ? true : false;
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const book = response.data;
        res.render('bookDetails', { book, user:req.session.user,isLoggedIn: isLoggedIn }); // Render a new template with the book details
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).send('Error fetching book details');
    }
};
