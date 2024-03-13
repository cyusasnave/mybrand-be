"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogLikesController_1 = __importDefault(require("../controllers/blogLikesController"));
const likesRouter = express_1.default.Router();
likesRouter.post("/:id/likes", blogLikesController_1.default.toggleLike);
exports.default = likesRouter;
