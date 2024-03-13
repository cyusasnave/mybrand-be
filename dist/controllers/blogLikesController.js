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
const blogLikesModel_1 = __importDefault(require("../models/blogLikesModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogModel_1 = __importDefault(require("../models/blogModel"));
const toggleLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid Blog Id",
        });
    }
    try {
        const blog = yield blogModel_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                status: "Fail",
                message: "Blog not found",
            });
        }
        let blogLike = yield blogLikesModel_1.default.findOne({ blog_id: blogId });
        if (!blogLike) {
            // Adding a blog like
            const newLike = new blogLikesModel_1.default({
                blog_id: blogId
            });
            const savedLike = yield newLike.save();
            blog.blog_likes.push(savedLike._id);
            yield blog.save();
            return res.status(200).json({
                status: "Success",
                message: "Like successfully added",
            });
        }
        else {
            // Removing a blog like
            yield blogLikesModel_1.default.deleteOne({ _id: blogLike._id });
            blog.blog_likes = blog.blog_likes.filter(id => !id.equals(blogLike === null || blogLike === void 0 ? void 0 : blogLike._id));
            yield blog.save();
            return res.status(200).json({
                status: "Success",
                message: "Like successfully removed",
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Fail",
            message: "Something went wrong",
        });
    }
});
exports.default = { toggleLike };
