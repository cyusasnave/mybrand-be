"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogsController_1 = __importDefault(require("../controllers/blogsController"));
const validation_1 = __importDefault(require("../middlewares/validation"));
const blogRouter = express_1.default.Router();
blogRouter.get("/", blogsController_1.default.allBlogs);
blogRouter.get("/:id", blogsController_1.default.getBlogById);
blogRouter.post("/", validation_1.default, blogsController_1.default.addBlog);
blogRouter.patch("/:id", blogsController_1.default.updateBlog);
blogRouter.delete("/:id", blogsController_1.default.deleteBlog);
exports.default = blogRouter;
