import { Request, Response } from "express";
import blogLikesModel from "../models/blogLikesModel";
import mongoose from "mongoose";
import blogModel from "../models/blogModel";

interface ExtendedRequest<T = Record<string, any>> extends Request<T> {
  user?: any;
}

const toggleLike = async (req: ExtendedRequest, res: Response) => {
  const { user } = req;

  if (!user) {
    return res.status(404).json({
      message: "No User found!",
    });
  }

  const userId = user._id;
  const blogId = req.params.blog_id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Invalid Id!",
    });
  }

  try {
    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        status: "Not Found",
        message: "Blog not found",
      });
    }

    let blogLike = await blogLikesModel.findOne({
      user_id: userId,
      blog_id: blogId,
    });

    if (!blogLike) {
      // Adding a blog like
      const newLike = new blogLikesModel({
        blog_id: blogId,
        user_id: userId,
      });
      const savedLike = await newLike.save();

      blog.blog_likes.push(savedLike._id);
      await blog.save();

      return res.status(201).json({
        status: "Success",
        message: "Like successfully added",
      });
    } else {
      // Removing a blog like
      await blogLikesModel.deleteOne({ _id: blogLike._id });

      blog.blog_likes = blog.blog_likes.filter(
        (id) => !id.equals(blogLike?._id)
      );
      await blog.save();

      return res.status(200).json({
        status: "Success",
        message: "Like successfully removed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Internal Server Error",
      message: "Something went wrong!",
    });
  }
};

const getNumberOfLikes = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blog_id;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Invalid Id!",
      });
    }

    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res.status(400).json({
        status: "Not Found",
        message: "Blog not found!",
      });
    }

    const NberOfLikes = blog?.blog_likes.length;

    res.status(200).json({
      status: "Success",
      message: "Likes fetched successfully!",
      NumberOfLikes: `This blog has ${NberOfLikes} like${
        NberOfLikes > 1 ? "s" : ""
      }`,
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: "Something went wrong!",
    });
  }
};

export default {
  toggleLike,
  getNumberOfLikes,
};
