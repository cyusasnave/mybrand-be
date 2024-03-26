import express from 'express';
import router from './routes';

const app = express();

app.use(express.json());
app.use("/api", router);

// npm i -D  @types/jest @types/supertest jest supertest ts-jest
// ts-node-dev

export default app;