import blogCommentsController from "../controllers/blogCommentsController";
import express from 'express'
import validation from "../middlewares/validation";

const commentRouter = express.Router();

commentRouter.post("/:id/comments",validation.isvalidComment ,blogCommentsController.addComment)
commentRouter.get("/:id/comments", blogCommentsController.blogWithComment)

export default commentRouter;