import { Request, Response } from "express";
import blogModel from "../models/blogModel";
import userModel from "../models/userModel";

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
  user?: any;
}

// Get all blogs logic
const allBlogs = async (req: Request, res: Response) => {
  const blogs = await blogModel.find();
  // res.send(blogs);
  res.status(200).json({
    message: "Blogs fetched successfully!",
    blogs: blogs,
  });
};

// Add blogs here logic
const addBlog = async (req: Request, res: Response) => {
  const blog = new blogModel({
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
  });
  try {
    await blog.save();
    // res.send(blog);
    res.status(201).json({
      message: "Blog added successfully!",
      blog: blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

// get blog by Id
const getBlogById = async (req: Request, res: Response) => {
  const blog = await blogModel.findById(req.params.id);

  if (blog == null) {
    return res.status(400).json({
      message: "Blog not found!",
    });
  }
  // res.send(blog);
  res.status(201).json({
    message: "Blog fetched successfully!",
    blog: blog,
  });
};

// Update blog logic
const updateBlog = async (req: AuthenticatedRequest, res: Response) => {
  /* let myBlog: typeof blogModel; */
  const userId = req.user;

  const user = await userModel.findOne({ _id: userId });
  if (user?.role !== "Admin") {
    return res.status(400).json({
      status: "Fail",
      message: "Only admin can perform this action!",
    });
  }
  try {
    const myBlog = await blogModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        date: req.body.date,
        content: req.body.content,
      },
      { new: true }
    );

    if (!myBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    await myBlog?.save();

    // res.send(myBlog);
    res.status(200).json({
      message: "Blog updated successfully!",
      blog: myBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

// Delete a blog logic
const deleteBlog = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user;

  const user = await userModel.findOne({ _id: userId });
  if (user?.role !== "Admin") {
    return res.status(400).json({
      status: "Fail",
      message: "Only admin can perform this action!",
    });
  }
  try {
    await blogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Blog deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

export default {
  allBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
};
