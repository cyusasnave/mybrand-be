"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const querriesController_1 = __importDefault(require("../controllers/querriesController"));
const validation_1 = __importDefault(require("../middlewares/validation"));
const querryRouter = express_1.default.Router();
querryRouter.post("/", validation_1.default.isValidQuerry, querriesController_1.default.addQuerries);
querryRouter.get("/", querriesController_1.default.getAllQuerries);
querryRouter.get("/:id", querriesController_1.default.getQuerryById);
querryRouter.patch("/:id", validation_1.default.isValidQuerry, querriesController_1.default.updateQuerry);
querryRouter.delete("/:id", querriesController_1.default.deleteQuerry);
exports.default = querryRouter;
