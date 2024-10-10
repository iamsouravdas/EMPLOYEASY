import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import { authMiddleware } from "../core/middlewares/authMiddleware.middlewares";

export const userRouter = Router();
const userController = new UserController();

userRouter.post("/create-new-user", userController.createNewUser);
userRouter.post("/login", userController.login);
userRouter.get("/test", userController.me);