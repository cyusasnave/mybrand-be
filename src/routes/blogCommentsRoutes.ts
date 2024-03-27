import blogCommentsController from "../controllers/blogCommentsController";
import express from "express";
import validation from "../middlewares/validation";
import authentication from "../middlewares/authentication";

const commentRouter = express.Router();

commentRouter.post(
  "/:id/comments",
  authentication.authLogIn,
  validation.isvalidComment,
  blogCommentsController.addComment
);

commentRouter.get("/:id/comments", blogCommentsController.blogWithComment);

export default commentRouter;
