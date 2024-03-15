import { Request, Response } from "express";
import blogLikesModel from "../models/blogLikesModel";
import mongoose, { Types } from "mongoose";
import blogModel from "../models/blogModel";

interface ExtendedRequest<T = Record<string, any>> extends Request<T> {
  user?: any
}

const toggleLike = async (req: ExtendedRequest, res: Response) => {

  const {user} = req;

  const userId = user._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid User Id!"
    })
  }
  const blogId = req.params.blog_id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid Blog Id!",
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

    let blogLike = await blogLikesModel.findOne({ user_id: userId, blog_id: blogId });

    if (!blogLike) {
      // Adding a blog like
      const newLike = new blogLikesModel({
        blog_id: blogId,
        user_id: userId
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
      message: "Internal Server Error!",
    });
  }
};

const getNumberOfLikes = async (req:Request, res:Response) => {
  try {
    const blogId = req.params.blog_id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid request!"
    })
  }

  const blog = await blogModel.findById(blogId);

  if (!blog) {
    return res.status(400).json({
      status: "Fail",
      message: "Blog not found!"
    })
  }

  const NberOfLikes = blog?.blog_likes.length;

  res.status(200).json({
    status: "Success",
    message: "Likes fetched successfully!",
    NumberOfLikes: `This blog has ${NberOfLikes} like${NberOfLikes > 1 ? "s" : ""}`
  })
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error!"
    })
  }
}

export default {
  toggleLike,
  getNumberOfLikes
};
