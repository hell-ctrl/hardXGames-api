import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import limiter from "./middlewares/requestLimit.js";

import authRouter from "./routers/authRouters.js";
import userRouter from "./routers/userRouters.js";

dotenv.config();
connectDB();
const app = express();

app.use(limiter);
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT, () => console.log("server started!"));
