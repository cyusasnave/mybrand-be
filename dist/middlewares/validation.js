"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogValidation_1 = __importDefault(require("../validations/blogValidation"));
const blogCommentvalidation_1 = __importDefault(require("../validations/blogCommentvalidation"));
const isValidBlog = (req, res, next) => {
    const { error } = (0, blogValidation_1.default)(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    try {
        next();
    }
    catch (error) {
        console.error(error);
    }
};
const isvalidComment = (req, res, next) => {
    const { error } = (0, blogCommentvalidation_1.default)(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    try {
        next();
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = {
    isValidBlog,
    isvalidComment
};
