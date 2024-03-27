import { Request, Response } from "express";
import blogModel from "../models/blogModel";
import { uploadSingle } from "../helpers/upload";
import mongoose from "mongoose";

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
  user?: any;
}

// Get all blogs logic
const allBlogs = async (req: Request, res: Response) => {
  const blogs = await blogModel.find();

  res.status(200).json({
    message: "Blogs fetched successfully!",
    blogs: blogs,
  });
};

// Add blogs here logic
const addBlog = async (req: Request, res: Response) => {
  try {
    let image;
    let uploadedImage;
    if (req.file) {
      image = req.file
      const uploadImage = await uploadSingle(image.path);

      if ("error" in uploadImage) {
        console.log(uploadImage);
        return res.status(500).json({
          message: "Error uploading image",
          error: uploadImage.error,
        });
      }
      
      uploadedImage = uploadImage?.secure_url;
    }
    const blog = new blogModel({
      image: uploadedImage, 
      title: req.body.title,
      date: req.body.date,
      content: req.body.content,
    });

    await blog.save();

    res.status(201).json({
      status: 'Success',
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
  const id = req.params.id
    if (!id) {
      return res.status(404).json({
        status: "Not Found",
        message: "Blog not found!",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Invalid Id!",
      });
    }
  const blog = await blogModel.findById(id);

  if (!blog || blog == null || blog == undefined) {
    return res.status(404).json({
      message: "Blog not found!",
    });
  }
  res.status(200).json({
    status: 'Success',
    message: "Blog fetched successfully!",
    blog: blog,
  });
};

// Update blog logic
const updateBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    let image;
    let uploadedImage;
    if (req.file) {
      image = req.file
      const uploadImage = await uploadSingle(image.path);

      if ("error" in uploadImage) {
        console.log(uploadImage);
        return res.status(500).json({
          message: "Error uploading image",
          error: uploadImage.error,
        });
      }
      
      uploadedImage = uploadImage?.secure_url;
    }

    const id = req.params.id
    if (!id) {
      return res.status(404).json({
        status: "Not Found",
        message: "Blog not found!",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Invalid Id!",
      });
    }

    const myBlog = await blogModel.findByIdAndUpdate(
      id,
      {
        image: uploadedImage,
        title: req.body.title,
        date: req.body.date,
        content: req.body.content,
      },
      { new: true }
    );

    if (!myBlog || myBlog == null || myBlog == undefined) {
      return res.status(404).json({
        message: "Blog not found!",
      });
    }

    await myBlog?.save();

    // res.send(myBlog);
    res.status(200).json({
      status: 'Success',
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
  try {
    const id = req.params.id
    // if (!id) {
    //   return res.status(404).json({
    //     status: "Not Found",
    //     message: "Blog not found!",
    //   });
    // }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Invalid Id!",
      });
    }
    const blog = await blogModel.findByIdAndDelete({ _id: id });

    if (!blog || blog == null || blog == undefined) {
      return res.status(404).json({
        message: "Blog not found!",
      });
    }

    res.status(200).json({
      status: 'Success',
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
