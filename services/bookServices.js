const { Books } = require('../models/index.js');
const { Op } = require('sequelize');
const AppError = require('../helpers/AppError.js')

exports.getAllBooks = async (limit = 10, offset = 0, keywords = "") => {
    const validateLimit = Math.max(1, parseInt(limit));
    const validateOffset = Math.max(0, parseInt(offset));

    const whereCondition = keywords
        ? {
            [Op.or]: [
                { title: { [Op.like]: `%${keywords}%` } },
                { author: { [Op.like]: `%${keywords}%` } },
                { publisher: { [Op.like]: `%${keywords}%` } },
            ],
        }
        : undefined;

    const { count, rows } = await Books.findAndCountAll({
        where: whereCondition,
        limit: validateLimit,
        offset: validateOffset
    })

    if (count === 0) {
        throw new AppError(`No book found`, 404);
    }

    return {
        count: count,
        rows: rows,
        currentPage: Math.ceil(offset / limit) + 1,
        totalPages: Math.ceil(count / limit),
    }
}

exports.getBookById = async (id) => {
    if (!id || isNaN(id)) {
        throw new AppError(`Invalid book id`, 400);
    }
    const book = await Books.findByPk(id);
    if (!book) {
        throw new AppError(`Book with id ${id} not found`, 404);
    }

    return book;
}

exports.updateBook = async (id, data) => {
    const book = await this.getBookById(id);
    if (!book) {
        throw new AppError(`Book with id ${id} not found`, 404);
    }
    await book.update(data);
    return book;
}

exports.deleteBook = async (id) => {
    const book = await this.getBookById(id);
    if (!book) {
        throw new AppError(`Book with id ${id} not found`, 404);
    }
    await book.destroy();
}