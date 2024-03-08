const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index.js");
const blogsRouter = require("./routes/blogsRoute.js");
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// My routes here
app.use("/", indexRouter);
app.use("/blogs", blogsRouter);

// I'm Connecting to MongoDB database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Server lstening to port 3000
app.listen(port, () => console.log(`Server is running on port ${port}`));
