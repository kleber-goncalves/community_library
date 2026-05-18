import { Router } from "express";
import userController from "../controller/userControllers.js";
import { validate } from "../middlewares/validationMiddlewares.js";
import { validadeUserId } from "../middlewares/validationMiddlewares.js";
import { userSchema } from "../schema/userSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
    "/users",
    validate(userSchema),
    userController.createUserController,
);

router.post(
    "/users/login",
    userController.loginUserController,
);

// todas as rotas abaixo dessa linha exigem autenticação
router.use(authMiddleware);
router.get("/users", userController.findAllUserController);

// rota para buscar um user utilizando o id
// a rota é do tipo ':id'
router.get("/users/:id", validadeUserId, userController.findUserByIdController);

router.patch("/users/:id", validadeUserId, userController.updateUserController);

router.delete(
    "/users/:id",
    validadeUserId,
    userController.deleteUserController,
);

export default router;
