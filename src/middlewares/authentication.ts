import { Request, Response } from "express";
import { verifyAccessToken } from "../helpers/security.helpers";
import { JwtPayload } from "jsonwebtoken";
import userModel from "../models/userModel";

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
  user?: JwtPayload;
}

const authLogIn = async (
  req: AuthenticatedRequest,
  res: Response,
  next: Function
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token || typeof token !== "string") {
    return res.status(498).json({
      status: "Fail",
      message: "Please logIn to continue!",
    });
  }

  try {
    const decoded = verifyAccessToken(token) as JwtPayload;
    if (decoded) {
      req.user = decoded.userId;
    } else {
      return res.status(401).json({
        status: "Fail",
        message: "Unauthorized, Please logIn to continue!",
      });
    }
  } catch (error) {
    return console.log(error);
  }
  next();
};
const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: Function
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token || typeof token !== "string") {
    return res.status(498).json({
      status: "Fail",
      message: "Please logIn to continue!",
    });
  }

  try {
    const decoded = verifyAccessToken(token) as JwtPayload;
    if (decoded) {
      req.user = decoded.userId;

      const userId = req.user;

      const user = await userModel.findById(userId);

      if (user?.role === "User") {
        return res.status(406).json({
          status: "Fail",
          message: "Only admin can perform this action!",
        });
      }

    } else {
      return res.status(401).json({
        status: "Fail",
        message: "Unauthorized, Please logIn to continue!",
      });
    }
  } catch (error) {
    return console.log(error);
  }
  next();
};

export default {
  authLogIn,
  isAdmin
};
