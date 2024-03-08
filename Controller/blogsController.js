const express = require('express');
const blogModel = require('../models/blogsModel.js');
const blogsModel = require('../models/blogsModel.js');


// Get all blogs logic
const allBlogs = async (req, res) => {
    const blogs = await blogModel.find();
    res.send(blogs);
}

// Add blogs here logic
const addBlog =  async (req, res) => {
    const blog = new blogModel({
        title: req.body.title,
        date: req.body.date,
        content: req.body.content   
    });
    try {
        await blog.save();
        res.send(blog);
    } catch (error) {
        console.log(error);
    }
}

// get blog by Id
const getBlogById = async (req, res) => {
    const blog = await blogModel.findById(req.params.id);
    res.send(blog);
}

// Update blog logic
const updateBlog = async (req, res) => {
    let myBlog;
    try {
        myBlog = await blogsModel.findByIdAndUpdate(req.params.id);
        myBlog.title = req.body.title;
        myBlog.date = req.body.date;
        myBlog.content = req.body.content;

        await myBlog.save();

        res.send(myBlog);
    } catch (error) {
        console.log(error);
    }
}

// Delete a blog logic
const deleteBlog = async (req, res) => {
    try {
        await blogModel.findByIdAndDelete(req.params.id);
        res.send('Blog deleted successfully');
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    allBlogs,
    addBlog,
    updateBlog,
    getBlogById,
    deleteBlog
}