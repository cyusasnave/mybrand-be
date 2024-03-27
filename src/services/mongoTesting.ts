import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const mongoTestingConnect = async () => {
   // const url = process.env.DATABASE_TESTING_URL as string;
    await mongoose.connect(process.env.DATABASE_TESTING_URL as string);
}

const mongoTestingDisconnect = async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
}

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once('open', () => console.info("Connected to Testing database 🔥"))

export default {
    mongoTestingConnect,
    mongoTestingDisconnect
}