const Model = require('../models/index.js');
const Books = Model.Books;

const getAllBooks = async (req, res) => {
    try {
        const books = await Books.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getBookById = async (req, res) => {
    try {
        const book = await Books.findByPk(req.params.id);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json(book);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const createBook = async (req, res) => {
    try {
        const book = await Books.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const updateBook = async (req, res) => {
    try {
        const book = await Books.findByPk(req.params.id);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            await book.update(req.body);
            res.json(book);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteBook = async (req, res) => {
    try {
        const book = await Books.findByPk(req.params.id);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            await book.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };