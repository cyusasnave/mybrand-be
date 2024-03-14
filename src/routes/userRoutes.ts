import userController from "../controllers/userController";
import express from 'express';
import authentication from "../middlewares/authentication";

const userRouter = express.Router();

userRouter.post("/", userController.createUser)
userRouter.post("/login", userController.logIn)
userRouter.get("/loggedInUser", authentication.authLogIn, userController.loggedInUser)
userRouter.get("/", userController.getAllUser)
userRouter.get("/:id", userController.getUserById)
userRouter.patch("/:id", userController.updateUserById)
userRouter.delete("/:id", userController.deleteuser)

export default userRouter;