import express from 'express';
import blogsController from '../controllers/blogsController';
import isValidBlog from '../middlewares/validation';

const blogRouter = express.Router();

blogRouter.get("/", blogsController.allBlogs);
blogRouter.get("/:id", blogsController.getBlogById);
blogRouter.post("/",isValidBlog, blogsController.addBlog);
blogRouter.patch("/:id", blogsController.updateBlog);
blogRouter.delete("/:id", blogsController.deleteBlog);

export default blogRouter;