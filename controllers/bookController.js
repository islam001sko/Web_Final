const axios = require('axios');
const Book = require('../models/bookModel');

exports.searchBooks = async (req, res) => {
    try {
        const { title } = req.query;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=AIzaSyCRBcTduN9KhnY9W_fJunhyhl0O_m9eWZw`);
        const books = response.data.items.map(book => ({
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || [],
            averageRating: book.volumeInfo.averageRating,
            pageCount: book.volumeInfo.pageCount,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
        }));
        res.render('book', { books, user: req.session.user });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
};

exports.createBook = async (req, res) => {
    try {
        const newBook = new Book({
            id: book.id,
            title: req.body.title,
            authors: req.body.authors,
            averageRating: book.volumeInfo.averageRating,
            pageCount: book.volumeInfo.pageCount,
            description: req.body.description,
            image: req.body.image,
        });
        await newBook.save();
        res.redirect('/admin/books'); 
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).send('Error creating book');
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

exports.renderCreateForm = (req, res) => {
    try {
      res.render('createBook'); // Assuming 'createBook.ejs' is your form template
    } catch (error) {
      console.error('Error rendering the create book form:', error);
      res.status(500).send('Error rendering the create book form');
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
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const book = response.data;
        res.render('bookDetails', { book }); // Render a new template with the book details
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).send('Error fetching book details');
    }
};
