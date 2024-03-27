import { Request, Response } from "express";
import validateBlog from "../validations/blogValidation";
import validComment from "../validations/blogCommentvalidation";
import validateQuerry from "../validations/querriesValidation";
import validateUser from "../validations/userValidation";

const isValidBlog = (req: Request, res: Response, next: Function) => {
  let image;

  if (req.file) {
    image = req.file.path;
  }

  const body = {
    image: image,
    title: req.body.title,
    content: req.body.content,
  };
  const { error } = validateBlog(body);

  if (error) {
    return res.status(400).json({
      status: 'Bad Request',
      message: error.details[0].message,
    });
  }
  try {
    next();
  } catch (error) {
    console.error(error);
  }
};

const isvalidComment = (req: Request, res: Response, next: Function) => {
  const { error } = validComment(req.body);

  if (error) {
    return res.status(400).json({
      status: 'Bad Request',
      message: error.details[0].message,
    });
  }
  try {
    next();
  } catch (error) {
    console.error(error);
  }
};

const isValidQuerry = (req: Request, res: Response, next: Function) => {
  const { error } = validateQuerry(req.body);

  if (error) {
    return res.status(400).json({
      status: 'Bad Request',
      message: error.details[0].message,
    });
  }
  try {
    next();
  } catch (error) {
    console.error(error);
  }
};

const isValidUser = (req: Request, res: Response, next: Function) => {
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).json({
      status: "Fail",
      message: error.details[0].message,
    });
  }
  try {
    next();
  } catch (error) {
    console.error(error);
  }
};

export default {
  isValidBlog,
  isvalidComment,
  isValidQuerry,
  isValidUser,
};
