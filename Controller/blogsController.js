const express = require("express");
const blogModel = require("../models/blogsModel.js");
const blogsModel = require("../models/blogsModel.js");

// Get all blogs logic
const allBlogs = async (req, res) => {
  const blogs = await blogModel.find();
    // res.send(blogs);
    res.status(201).json({
      message: "Blogs fetched successfully!",
      blogs: blogs,
    });
};

// Add blogs here logic
const addBlog = async (req, res) => {
  const blog = new blogModel({
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
  });
  try {
    await blog.save();
    // res.send(blog);
    res.status(200).json({
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
const getBlogById = async (req, res) => {
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
const updateBlog = async (req, res) => {
  let myBlog;
  try {
    myBlog = await blogsModel.findByIdAndUpdate(req.params.id);
    myBlog.title = req.body.title;
    myBlog.date = req.body.date;
    myBlog.content = req.body.content;

    await myBlog.save();

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
const deleteBlog = async (req, res) => {
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

module.exports = {
  allBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
};
