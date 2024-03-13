import express from 'express';
import blogsController from '../controllers/blogsController';
import validation from '../middlewares/validation';

const blogRouter = express.Router();

blogRouter.get("/", blogsController.allBlogs);
blogRouter.get("/:id", blogsController.getBlogById);
blogRouter.post("/",validation.isValidBlog, blogsController.addBlog);
blogRouter.patch("/:id", blogsController.updateBlog);
blogRouter.delete("/:id", blogsController.deleteBlog);

export default blogRouter;