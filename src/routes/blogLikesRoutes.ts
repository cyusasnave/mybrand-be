import express from "express";
import blogLikesController from "../controllers/blogLikesController";
import authentication from "../middlewares/authentication";

const likesRouter = express.Router();

likesRouter.post(
  "/:blog_id/likes",
  authentication.authLogIn,
  blogLikesController.toggleLike
);

likesRouter.get("/:blog_id/likes", blogLikesController.getNumberOfLikes);

export default likesRouter;
