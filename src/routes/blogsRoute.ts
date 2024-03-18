import express from 'express';
import blogsController from '../controllers/blogsController';
import validation from '../middlewares/validation';
import authentication from '../middlewares/authentication';

const blogRouter = express.Router();

blogRouter.get("/", blogsController.allBlogs);
blogRouter.get("/:id", blogsController.getBlogById);
blogRouter.post("/",validation.isValidBlog, blogsController.addBlog);
blogRouter.patch("/:id",authentication.authLogIn, blogsController.updateBlog);
blogRouter.delete("/:id",authentication.authLogIn, blogsController.deleteBlog);

export default blogRouter;