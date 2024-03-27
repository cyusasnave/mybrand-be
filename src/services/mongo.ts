import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.info("Connected to Database! 🔥"))

const mongoConnect = async () => {
    const url = process.env.DATABASE_URL;
    await mongoose.connect(url as string)
};

export default {
    mongoConnect
}