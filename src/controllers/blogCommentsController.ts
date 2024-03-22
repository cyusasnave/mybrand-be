import { Request, Response } from "express";
import blogCommentModel from "../models/blogCommentModel";
import blogModel from "../models/blogModel";
import mongoose from "mongoose";

interface ExtendedRequest<T = Record<string, any>> extends Request<T> {
  user?: any;
}

const addComment = async (req: Request, res: Response) => {
  try {
    const { user } = (req as ExtendedRequest).user;

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(406).json({
        message: "Invalid blog Id!",
      });
    }

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "No blog found!",
      });
    }

    const myComment = new blogCommentModel({
      user: user?.name,
      comment: req.body.comment,
      blog_id: id,
    });

    const commentData = await myComment.save();

    blog.blogs_comments.push(commentData._id);
    await blog.save();

    

    return res.status(201).json({
      status: "Success",
      message: "Comment Added successfully",
      comment: commentData,
      
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

const blogWithComment = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(406).json({
        status: "Fail",
        message: "Blog Id not valid!",
      });
    }

    const blogWithComments = await blogModel
      .findById(blogId)
      .populate("blogs_comments");

    if (!blogWithComments) {
      return res.status(404).json({
        status: "Fail",
        message: "Blog not found!",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Blog fetched successfully",
      blogWithComments: blogWithComments
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

export default {
  addComment,
  blogWithComment,
};
