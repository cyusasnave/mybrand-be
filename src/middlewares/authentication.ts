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
    return res.status(400).json({
      status: "Fail",
      message: "Please logIn to continue!",
    });
  }

  try {
    const decoded = verifyAccessToken(token) as JwtPayload;
    if (decoded) {
      req.user = decoded.data;
    } else {
      return res.status(400).json({
        status: "Fail",
        message: "Can't Access find User!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Fail",
      message: "Please logIn to continue!",
    });
  }
  next();
};

export default {
  authLogIn,
};
