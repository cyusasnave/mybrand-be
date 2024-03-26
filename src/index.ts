import mongo from "./services/mongo";
import app from "./app";
import swaggerDocs from "./services/swagger";
import dotenv from 'dotenv';
dotenv.config();

const startServer = async () => {
    await mongo.mongoConnect();

    const port = process.env.PORT as string;
    app.listen(port, () => console.info(`Server running on port ${port} 🤜🤛 😎 `));

    swaggerDocs(app, port);
}

startServer();
