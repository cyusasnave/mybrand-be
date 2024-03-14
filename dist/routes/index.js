"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogsRoute_1 = __importDefault(require("./blogsRoute"));
const blogCommentsRoutes_1 = __importDefault(require("./blogCommentsRoutes"));
const blogLikesRoutes_1 = __importDefault(require("./blogLikesRoutes"));
const querriesRoutes_1 = __importDefault(require("./querriesRoutes"));
const router = express_1.default.Router();
router.use("/blogs", blogsRoute_1.default);
router.use("/blogs", blogCommentsRoutes_1.default);
router.use("/blogs", blogLikesRoutes_1.default);
router.use("/querries", querriesRoutes_1.default);
exports.default = router;
