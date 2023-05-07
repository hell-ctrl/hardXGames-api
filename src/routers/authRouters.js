import { Router } from "express";
import signup from "../controllers/auth/signup.js";
import signin from "../controllers/auth/signin.js";

const authRouter = Router();

authRouter.get("/");
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

export default authRouter;