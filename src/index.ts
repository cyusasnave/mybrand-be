import mongo from "./services/mongo";
import app from "./app";

const startServer = async () => {
    await mongo.mongoConnect();

    const port = 3000;
    app.listen(port, () => console.info(`Server running on port ${port} 🤜🤛`))
}

startServer();
