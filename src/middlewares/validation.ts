import { Request, Response } from "express";
import validateBlog from "../validations/blogValidation";
import validComment from "../validations/blogCommentvalidation";
import validateQuerry from "../validations/querriesValidation";

const isValidBlog = (req: Request, res: Response, next: Function) => {
  const { error } = validateBlog(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    next();
  } catch (error) {
    console.error(error);
  }
};

const isvalidComment = (req:Request, res:Response, next:Function) => {
  const { error } = validComment(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    next();
  } catch (error) {
    console.error(error)
  }
}

const isValidQuerry = (req:Request, res:Response, next:Function) => {
  const { error } = validateQuerry(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    next();
  } catch (error) {
    console.error(error)
  }

}

export default {
  isValidBlog,
  isvalidComment,
  isValidQuerry
};
