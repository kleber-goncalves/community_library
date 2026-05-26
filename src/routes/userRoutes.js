import { Router } from "express";
import userController from "../controller/userControllers.js";
import { validate } from "../middlewares/validationMiddlewares.js";
import { validadeUserId } from "../middlewares/validationMiddlewares.js";
import { userSchema } from "../schema/userSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// rota para criar um user
router.post("/", validate(userSchema), userController.createUserController);

router.post("/login", userController.loginUserController);

// todas as rotas abaixo dessa linha exigem autenticação
router.use(authMiddleware);

// rota para buscar todos os users
router.get("/", userController.findAllUserController);

// rota para buscar um user utilizando o id
// a rota é do tipo ':id'
router.get("/:id", validadeUserId, userController.findUserByIdController);

// rota para atualizar um user
router.patch("/:id", validadeUserId, userController.updateUserController);

router.delete("/:id", validadeUserId, userController.deleteUserController);

export default router;
