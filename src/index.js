import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";

import authRouter from "./routers/authRouters.js";

connectDB();
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.listen(process.env.PORT, () => console.log("server started!"));
