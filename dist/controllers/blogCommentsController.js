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
const blogCommentModel_1 = __importDefault(require("../models/blogCommentModel"));
const blogModel_1 = __importDefault(require("../models/blogModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid blog Id!",
            });
        }
        const blog = yield blogModel_1.default.findById(id);
        if (!blog) {
            return res.status(404).json({
                message: "No blog found!",
            });
        }
        const myComment = new blogCommentModel_1.default({
            user: user.name,
            comment: req.body.comment,
            blog_id: id,
        });
        const commentData = yield myComment.save();
        blog.blogs_comments.push(commentData._id);
        yield blog.save();
        const blogWithComments = yield blogModel_1.default.findById(id).populate('blogs_comments');
        return res.status(200).json({
            status: 'Success',
            message: 'Comment Added successfully',
            comment: commentData,
            blogWithComments: blogWithComments,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
const blogWithComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                status: "Fail",
                message: "Blog Id not found!",
            });
        }
        const blog = yield blogModel_1.default.findById(blogId);
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
exports.default = {
    addComment,
    blogWithComment
};
