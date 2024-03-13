import express from 'express';
import blogLikesController from '../controllers/blogLikesController';

const likesRouter = express.Router();

likesRouter.post("/:id/likes", blogLikesController.toggleLike)

export default likesRouter