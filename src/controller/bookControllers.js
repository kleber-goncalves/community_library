import bookServices from "../service/bookServices.js";

async function createBookController(req, res) {
    const newBook = req.body;
    const userId = req.userId;
    try {
        const createdBook = await bookServices.createBookService(
            newBook,
            userId,
        );
        res.status(201).send(createdBook);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function findAllBooksController(req, res) {
    try {
        const books = await bookServices.findAllBooksService();
        res.status(201).send(books);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function findBookByIdController(req, res) {
    const bookId = req.params.id;

    try {
        const book = await bookServices.findBookByIdService(bookId);
        res.status(200).send(book);
    } catch (err) {
        res.status(404).send(err.message);
    }
}

async function updateBookController(req, res) {
    const updatedBook = req.body;
    console.log(updatedBook);
    const bookId = req.params.id;
    const userId = req.userId;

    try {
        const book = await bookServices.updateBookService(
            updatedBook,
            bookId,
            userId,
        );
        res.status(200).send({ book });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function deleteBookController(req, res) {
    const bookId = req.params.id;
    const userId = req.userId;

    try {
        const book = await bookServices.deleteBookService(bookId, userId);
        res.status(200).send({ book });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function searchBookController(req, res) {
    const { search } = req.query;
    try {
        const books = await bookServices.searchBookService(search);
        res.status(200).send(books);

    } catch (err) {
        res.status(400).send(err.message);
    }
}

export default {
    createBookController,
    findAllBooksController,
    findBookByIdController,
    updateBookController,
    deleteBookController,
    searchBookController,
};
