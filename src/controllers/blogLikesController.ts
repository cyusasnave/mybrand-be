import { Request, Response } from "express";
import blogLikesModel from "../models/blogLikesModel";
import mongoose, { Types } from "mongoose";
import blogModel from "../models/blogModel";

const toggleLike = async (req: Request, res: Response) => {
  const blogId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid Blog Id",
    });
  }

  try {
    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        status: "Fail",
        message: "Blog not found",
      });
    }

    let blogLike = await blogLikesModel.findOne({ blog_id: blogId });

    if (!blogLike) {
      // Adding a blog like
      const newLike = new blogLikesModel({
        blog_id: blogId
      });
      const savedLike = await newLike.save();

      blog.blog_likes.push(savedLike._id);
      await blog.save();

      return res.status(200).json({
        status: "Success",
        message: "Like successfully added",
      });
    } else {
      // Removing a blog like
      await blogLikesModel.deleteOne({ _id: blogLike._id });

      blog.blog_likes = blog.blog_likes.filter(id => !id.equals(blogLike?._id));
      await blog.save();

      return res.status(200).json({
        status: "Success",
        message: "Like successfully removed",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong",
    });
  }
};

export default {toggleLike};
