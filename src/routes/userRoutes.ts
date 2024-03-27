import express from "express";
import authentication from "../middlewares/authentication";
import validation from "../middlewares/validation";
import userController from "../controllers/userController";

const userRouter = express.Router();
userRouter.post("/register", validation.isValidUser, userController.createUser);

userRouter.post("/login", userController.logIn);

userRouter.get(
  "/loggedInUser",
  authentication.authLogIn,
  userController.loggedInUser
);

userRouter.get("/", authentication.isAdmin, userController.getAllUser);

userRouter.get("/:id", authentication.isAdmin, userController.getUserById);

userRouter.patch(
  "/:id",
  authentication.isAdmin,
  validation.isValidUser,
  userController.updateUserById
);

userRouter.delete("/:id", authentication.isAdmin, userController.deleteuser);

export default userRouter;
