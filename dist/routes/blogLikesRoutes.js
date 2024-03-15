"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogLikesController_1 = __importDefault(require("../controllers/blogLikesController"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const likesRouter = express_1.default.Router();
likesRouter.post("/:blog_id/likes", authentication_1.default.authLogIn, blogLikesController_1.default.toggleLike);
likesRouter.get("/:blog_id/likes", blogLikesController_1.default.getNumberOfLikes);
exports.default = likesRouter;
