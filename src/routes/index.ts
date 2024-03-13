import express from 'express';
import blogRouter from './blogsRoute';
import commentRouter from './blogCommentsRoutes';

const router = express.Router();

router.use("/blogs", blogRouter);
router.use("/blogs", commentRouter);

export default router;