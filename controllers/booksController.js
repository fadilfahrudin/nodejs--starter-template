const { Books } = require('../models/index.js');
const { getAllBooks, getBookById, updateBook, deleteBook } = require("../services/bookServices.js");
const { successResponse } = require('../helpers/responseHelper.js');
const getAllBooksController = async (req, res, next) => {
    try {
        const { limit, offset, keywords } = req.query;
        const data = await getAllBooks(limit, offset, keywords);
        successResponse(res, "Success get all books", data);
    } catch (error) {
        next(error);
    }
}
const getBookByIdController = async (req, res, next) => {
    try {
        const data = await getBookById(req.params.id);
        successResponse(res, "Success get book", data, 200);
    } catch (error) {
        next(error);
    }
}
const createBookController = async (req, res, next) => {
    try {
        const book = await Books.create(req.body);
        successResponse(res, "Success create book", book, 201);
    } catch (error) {
        next(error);
    }
}
const updateBookController = async (req, res, next) => {
    try {
        const book = await updateBook(req.params.id, req.body);
        successResponse(res, "Success update book", book, 200);
    } catch (error) {
        next(error);
    }
}

const deleteBookController = async (req, res, next) => {
    try {
        await deleteBook(req.params.id);
        successResponse(res, "Success delete book", null, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllBooksController, getBookByIdController, createBookController, updateBookController, deleteBookController };