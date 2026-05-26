import { Router } from "express";
import bookControllers from "../controller/bookControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddlewares.js";
import { bookIdSchema } from "../schema/bookSchema.js";
import { validadeBookId } from "../middlewares/validationMiddlewares.js";
import { bookSchema } from "../schema/bookSchema.js";

const router = Router();

// rota para buscar todos os livros
router.get("/", bookControllers.findAllBooksController);

// todas as rotas abaixo dessa linha exigem autenticação
router.use(authMiddleware);
// rota para criar um livro
router.post("/", validate(bookSchema), bookControllers.createBookController);

// rota para buscar livros pelo termo de busca
router.get("/search", bookControllers.searchBookController);

// ------ ROTAS USANDO ID -----//

// rota para buscar um livro utilizando o id
router.get("/:id", validadeBookId, bookControllers.findBookByIdController);

// rota para atualizar um livro
router.patch("/:id", validadeBookId, bookControllers.updateBookController);

router.delete("/:id", validadeBookId, bookControllers.deleteBookController);

export default router;
