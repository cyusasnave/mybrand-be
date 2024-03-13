import { Request, Response } from "express";
import blogCommentModel from "../models/blogCommentModel";
import blogModel from "../models/blogModel";
import mongoose from "mongoose";

const addComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
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
      comment: req.body.comment,
      blog_id: id,
    });

    const commentData = await myComment?.save();

    blog.blogs_comments.push(commentData.comment);

    await blog.save();

    return res.status(201).json({
      status: "Success",
      message: "Comment Added successfully",
      comment: commentData
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
      return res.status(400).json({
        status: "Fail",
        message: "Blog Id not found!",
      });
    }

    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        status: "Fail",
        message: "Blog not found!",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Blog fetched successfully",
      blog: blog,
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
  blogWithComment
};
