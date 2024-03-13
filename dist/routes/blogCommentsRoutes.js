"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogCommentsController_1 = __importDefault(require("../controllers/blogCommentsController"));
const express_1 = __importDefault(require("express"));
const validation_1 = __importDefault(require("../middlewares/validation"));
const commentRouter = express_1.default.Router();
commentRouter.post("/:id/comments", validation_1.default.isvalidComment, blogCommentsController_1.default.addComment);
commentRouter.get("/:id/comments", blogCommentsController_1.default.blogWithComment);
exports.default = commentRouter;
