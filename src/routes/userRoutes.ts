import userController from "../controllers/userController";
import express from 'express';
import authentication from "../middlewares/authentication";
import validation from "../middlewares/validation";

const userRouter = express.Router();

userRouter.post("/",validation.isValidUser ,userController.createUser)
userRouter.post("/login", userController.logIn)
userRouter.get("/loggedInUser", authentication.authLogIn, userController.loggedInUser)
userRouter.get("/", userController.getAllUser)
userRouter.get("/:id", userController.getUserById)
userRouter.patch("/:id",validation.isValidUser ,userController.updateUserById)
userRouter.delete("/:id", userController.deleteuser)

export default userRouter;