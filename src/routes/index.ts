import express from 'express';
import blogRouter from './blogsRoute';
import commentRouter from './blogCommentsRoutes';
import likesRouter from './blogLikesRoutes';

const router = express.Router();

router.use("/blogs", blogRouter);
router.use("/blogs", commentRouter);
router.use("/blogs", likesRouter);

export default router;