const express = require('express');
const router = express.Router();
const { getAllBooksController, getBookByIdController, createBookController, updateBookController, deleteBookController} = require('../controllers/booksController.js');

router.get('/', getAllBooksController);
router.get('/:id', getBookByIdController);
router.post('/', createBookController);
router.patch('/:id', updateBookController);
router.delete('/:id', deleteBookController);

module.exports = router;