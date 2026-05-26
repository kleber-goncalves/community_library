import { Router } from "express";
import loanControllers from "../controller/loanControllers.js";
import { validate } from "../middlewares/validationMiddlewares.js";
import { loanSchema, loanIdSchema } from "../schema/loanSchema.js";
import { validadeLoanId } from "../middlewares/validationMiddlewares.js";

const router = Router();

// rota para criar um emprestimo
router.post("/", validate(loanSchema), loanControllers.createLoanController);

// rota para buscar todos os emprestimos
router.get("/", loanControllers.findAllLoansController);

// ------ ROTAS USANDO ID -----//

// rota para buscar um emprestimo utilizando o id
router.get("/:id", validadeLoanId, loanControllers.findLoanByIdController);

// rota para deletar um emprestimo utilizando o id
router.delete("/:id", validadeLoanId, loanControllers.deleteLoanController);

export default router;
