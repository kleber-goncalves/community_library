import { Router } from "express";
import userController from "../controller/userControllers.js";

const router = Router();

router.post("/users", userController.createUserController);

export default router;
