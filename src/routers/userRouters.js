import { Router } from "express";
import isLogged from "../middlewares/isLogged.js";
import updateUser from "../controllers/user/updateUser.js";
import deleteUser from "../controllers/user/deleteUser.js";

const userRouter = Router();

userRouter.patch("/", isLogged, updateUser);
userRouter.delete("/", isLogged, deleteUser);

export default userRouter;