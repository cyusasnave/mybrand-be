import { Request, Response } from "express";
import blogCommentModel from "../models/blogCommentModel";
import blogModel from "../models/blogModel";
import mongoose from "mongoose";
import userModel from "../models/userModel";

interface ExtendedRequest<T = Record<string, any>> extends Request<T> {
  user?: any;
}

const addComment = async (req: Request, res: Response) => {
  try {
    const { user } = (req as ExtendedRequest);

    const myUser = await userModel.findById(user);
    console.log(user);
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        status: "Not Found",
        message: "Blog not found!",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Id!",
      });
    }

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "No blog found!",
      });
    }

    const myComment = new blogCommentModel({
      user: myUser?.name,
      comment: req.body.comment,
      blog_id: id,
    });

    const commentData = await myComment.save();

    blog.blogs_comments.push(commentData._id);
    await blog.save();

    return res.status(201).json({
      status: "Success",
      message: "Comment Added successfully",
      comment: myComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Internal Server Error",
      message: "Something went wrong!",
    });
  }
};

const blogWithComment = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    if (!blogId) {
      return res.status(404).json({
        status: "Not Found",
        message: "Blog not found!",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        message: "Invalid Id!"
      });
    }

    const blogWithComments = await blogModel
      .findById(blogId)
      .populate("blogs_comments");

    if (!blogWithComments) {
      return res.status(404).json({
        status: "Not Found",
        message: "Blog not found!",
      });
    }

    const commentsOfBlog = {
      blogId: blogWithComments._id,
      comments: blogWithComments.blogs_comments
    }

    return res.status(200).json({
      status: "Success",
      message: "Blog fetched successfully",
      blogWithComments: commentsOfBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Internal Server Error",
      message: "Something went wrong!",
    });
  }
};

export default {
  addComment,
  blogWithComment,
};
