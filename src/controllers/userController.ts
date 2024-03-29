import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../helpers/security.helpers";
import mongoose from "mongoose";

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
  user?: any;
}

const createUser = async (req: Request, res: Response) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (user) {
    return res.status(409).json({
      status: "Conflict",
      message: `User with email ${req.body.email} already exists in our system!`,
    });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedConfirmPassword = await bcrypt.hash(
      req.body.ConfirmPassword,
      salt
    );

    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
      ConfirmPassword: hashedConfirmPassword
    });

    await newUser?.save();

    const myUser = {
      _id: newUser?._id,
      name: newUser?.name,
      role: newUser?.role,
      email: newUser?.email,
    };

    return res.status(201).json({
      status: "Success",
      message: "User created successfully!",
      user: myUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Internal Server Error",
      message: "Something went wrong!",
    });
  }
};

const logIn = async (req: Request, res: Response) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Wrong credentials!",
    });
  }

  const isTruePassword = await bcrypt.compare(req.body.password, user.password);

  if (!isTruePassword) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Wrong credentials!",
    });
  }

  try {
    const token = generateAccessToken(user._id);

    return res.status(200).json({
      status: "Success",
      message: "User logged In Successfully!",
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Internal Server Error",
      message: "Something went wrong!",
    });
  }
};

const loggedInUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user;

  const user = await userModel.findOne({ _id: userId });

  if (userId) {
    return res.status(200).json({
      status: "Success",
      message: "LoggedIn user fetched successfully!",
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
    });
  } else {
    return res.status(404).json({
      status: "Not Found",
      message: "User not found!",
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find({});

    res.status(200).json({
      status: "Success",
      message: "Users fetched successfully!",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: "Something went wrong!",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found!",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Invalid Id!",
      });
    }
    const user = await userModel.findById(id);

    if (!user || user == undefined) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found!",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "User fetched successfully!",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: "Something went wrong!",
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found!",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Invalid Id!",
      });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedConfirmPassword = await bcrypt.hash(
      req.body.ConfirmPassword,
      salt
    );

    const user = await userModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hashedPassword,
        ConfirmPassword: hashedConfirmPassword,
      },
      { new: true }
    );

    if (!user || user == undefined) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found!",
      });
    }

    await user?.save();

    res.status(200).json({
      status: "Success",
      message: "User updated successfully!",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: "Something went wrong!",
    });
  }
};

const deleteuser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found!",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Invalid Id!",
      });
    }
    const user = await userModel.findByIdAndDelete(id);

    if (!user || user == null || user == undefined) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found!",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "User deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: "Something went wrong!",
    });
  }
};

export default {
  createUser,
  logIn,
  loggedInUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteuser,
};
