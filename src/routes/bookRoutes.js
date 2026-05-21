import { Router } from "express";
import bookControllers from "../controller/bookControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddlewares.js";
import { bookIdSchema } from "../schema/bookSchema.js";
import { validadeBookId } from "../middlewares/validationMiddlewares.js";
import { bookSchema } from "../schema/bookSchema.js";

const router = Router();

// rota para buscar todos os livros
router.get("/books", bookControllers.findAllBooksController);

// todas as rotas abaixo dessa linha exigem autenticação
router.use(authMiddleware);
// rota para criar um livro
router.post(
    "/books",
    validate(bookSchema),
    bookControllers.createBookController,
);

router.get(
    "/books/:id",
    validadeBookId,
    bookControllers.findBookByIdController,
);

router.patch(
    "/books/:id",
    validadeBookId,
    bookControllers.updateBookController,
);

router.delete(
    "/books/:id",
    validadeBookId,
    bookControllers.deleteBookController,
);

export default router;
