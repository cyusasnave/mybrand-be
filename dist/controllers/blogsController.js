"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogModel_1 = __importDefault(require("../models/blogModel"));
// Get all blogs logic
const allBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blogModel_1.default.find();
    // res.send(blogs);
    res.status(201).json({
        message: "Blogs fetched successfully!",
        blogs: blogs,
    });
});
// Add blogs here logic
const addBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = new blogModel_1.default({
        title: req.body.title,
        date: req.body.date,
        content: req.body.content,
    });
    try {
        yield blog.save();
        // res.send(blog);
        res.status(200).json({
            message: "Blog added successfully!",
            blog: blog,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
});
// get blog by Id
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogModel_1.default.findById(req.params.id);
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
});
// Update blog logic
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* let myBlog: typeof blogModel; */
    try {
        const myBlog = yield blogModel_1.default.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            date: req.body.date,
            content: req.body.content
        }, { new: true });
        if (!myBlog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        yield (myBlog === null || myBlog === void 0 ? void 0 : myBlog.save());
        // res.send(myBlog);
        res.status(200).json({
            message: "Blog updated successfully!",
            blog: myBlog,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
});
// Delete a blog logic
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blogModel_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Blog deleted successfully!",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
});
exports.default = {
    allBlogs,
    addBlog,
    updateBlog,
    getBlogById,
    deleteBlog,
};
