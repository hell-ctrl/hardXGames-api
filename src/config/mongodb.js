import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", true);

const urlDB = process.env.URL_DB;

const connectDB = () => {
  mongoose
    .connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("conectado ao mongodb"))
    .catch((err) => console.log(err));
};

export default connectDB;
