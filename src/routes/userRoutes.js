import { Router } from "express";
import userController from "../controller/userControllers.js";
import { validate } from "../middlewares/validationMiddlewares.js";
import { userSchema } from "../schema/userSchema.js";

const router = Router();

router.post(
    "/users",
    validate(userSchema),
    userController.createUserController,
);

export default router;
