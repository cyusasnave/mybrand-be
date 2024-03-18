import userController from "../controllers/userController";
import express from 'express';
import authentication from "../middlewares/authentication";
import validation from "../middlewares/validation";

const userRouter = express.Router();

userRouter.post("/register",validation.isValidUser ,userController.createUser)
userRouter.post("/login", userController.logIn)
userRouter.get("/loggedInUser", authentication.authLogIn, userController.loggedInUser)
userRouter.get("/",authentication.authLogIn, userController.getAllUser)
userRouter.get("/:id",authentication.authLogIn, userController.getUserById)
userRouter.patch("/:id",authentication.authLogIn,validation.isValidUser ,userController.updateUserById)
userRouter.delete("/:id",authentication.authLogIn, userController.deleteuser)

export default userRouter;