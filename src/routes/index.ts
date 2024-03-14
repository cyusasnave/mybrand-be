import express from 'express';
import blogRouter from './blogsRoute';
import commentRouter from './blogCommentsRoutes';
import likesRouter from './blogLikesRoutes';
import querryRouter from './querriesRoutes';

const router = express.Router();

router.use("/blogs", blogRouter);
router.use("/blogs", commentRouter);
router.use("/blogs", likesRouter);
router.use("/querries", querryRouter)

export default router;