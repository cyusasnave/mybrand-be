import express from "express";
import router from "./routes";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: [
    "https://mybrand-be-asyh.onrender.com/api-docs/",
    "http://localhost:3000",
    "http://127.0.0.1:5501",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

// npm i -D  @types/jest @types/supertest jest supertest ts-jest
// ts-node-dev

export default app;
