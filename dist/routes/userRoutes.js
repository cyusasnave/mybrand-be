"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const userRouter = express_1.default.Router();
userRouter.post("/", userController_1.default.createUser);
userRouter.post("/login", userController_1.default.logIn);
userRouter.get("/loggedInUser", authentication_1.default.authLogIn, userController_1.default.loggedInUser);
userRouter.get("/", userController_1.default.getAllUser);
userRouter.get("/:id", userController_1.default.getUserById);
userRouter.patch("/:id", userController_1.default.updateUserById);
userRouter.delete("/:id", userController_1.default.deleteuser);
exports.default = userRouter;
