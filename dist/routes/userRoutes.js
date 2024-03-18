"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const validation_1 = __importDefault(require("../middlewares/validation"));
const userRouter = express_1.default.Router();
userRouter.post("/register", validation_1.default.isValidUser, userController_1.default.createUser);
userRouter.post("/login", userController_1.default.logIn);
userRouter.get("/loggedInUser", authentication_1.default.authLogIn, userController_1.default.loggedInUser);
userRouter.get("/", authentication_1.default.authLogIn, userController_1.default.getAllUser);
userRouter.get("/:id", authentication_1.default.authLogIn, userController_1.default.getUserById);
userRouter.patch("/:id", authentication_1.default.authLogIn, validation_1.default.isValidUser, userController_1.default.updateUserById);
userRouter.delete("/:id", authentication_1.default.authLogIn, userController_1.default.deleteuser);
exports.default = userRouter;
