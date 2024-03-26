import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());
app.use("/api", router);

// npm i -D  @types/jest @types/supertest jest supertest ts-jest
// ts-node-dev

export default app;