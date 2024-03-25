import express from "express";
import blogsController from "../controllers/blogsController";
import validation from "../middlewares/validation";
import authentication from "../middlewares/authentication";
import fileUpload from "../middlewares/multer";

const blogRouter = express.Router();

blogRouter.get("/", blogsController.allBlogs);
blogRouter.get("/:id", blogsController.getBlogById);

blogRouter.post("/", authentication.isAdmin, fileUpload.single('image'), validation.isValidBlog, blogsController.addBlog);

blogRouter.patch("/:id", authentication.isAdmin, fileUpload.single('image'), blogsController.updateBlog);

blogRouter.delete("/:id", authentication.isAdmin, blogsController.deleteBlog);

export default blogRouter;
