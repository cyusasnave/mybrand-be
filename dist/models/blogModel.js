"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
    },
    blogs_comments: [{ type: String }],
    blog_likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Like" }]
}, { timestamps: true });
exports.default = mongoose_1.default.model("Blog", blogSchema);
