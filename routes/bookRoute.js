const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/search', bookController.searchBooks);
router.get('/book-details/:id', bookController.bookDetails);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id/edit', bookController.getBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
