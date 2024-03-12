import express from 'express';
import blogRouter from './blogsRoute';

const router = express.Router();

router.use("/blogs", blogRouter);

export default router;