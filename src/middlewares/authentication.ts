import { Request, Response } from "express";
import { verifyAccessToken } from "../helpers/security.helpers";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
  user?: JwtPayload;
}

const authLogIn = async (
  req: AuthenticatedRequest,
  res: Response,
  next: Function
) => {
  const token = req.headers["authorization"];

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
    console.log(error);
    res.status(409).json({
      status: "Fail",
      message: "Please logIn to continue!",
    });
  }
  next();
};

export default {
  authLogIn,
};
