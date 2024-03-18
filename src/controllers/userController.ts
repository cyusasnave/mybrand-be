import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../helpers/security.helpers";

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
  user?: any;
}

const createUser = async (req: Request, res: Response) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (user) {
    return res.status(409).json({
      status: "Fail",
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
      password: hashedPassword,
      ConfirmPassword: hashedConfirmPassword,
    });

    await newUser.save();

    return res.status(201).json({
      status: "Success",
      message: "User created successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

const logIn = async (req: Request, res: Response) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid user or password. Please try again!",
    });
  }

  const isTruePassword = await bcrypt.compare(req.body.password, user.password);

  if (!isTruePassword) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid User or password. Please try again!",
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
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

const loggedInUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId  = req.user;

  const user = await userModel.findOne({_id: userId});
  if (userId) {
    return res.status(200).json({
      status: "Success",
      message: "LoggedIn user fetched successfully!",
      user: {
        name: user?.name,
        email: user?.email,
        role: user?.role
      },
    });
  } else {
    return res.status(400).json({
      status: "Fail",
      message: "User not found!",
    });
  }
};

const getAllUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId  = req.user;

  const user = await userModel.findOne({_id: userId});
  if (user?.role !== "Admin") {
    return res.status(400).json({
      status: "Fail",
      message: "Only admin can perform this action!",
    })
  }
  try {
    const users = await userModel.find({});

    res.status(200).json({
      status: "Success",
      message: "Users fetched successfully!",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  const userId  = req.user;

  const user = await userModel.findOne({_id: userId});
  if (user?.role === "User") {
    return res.status(400).json({
      status: "Fail",
      message: "Only admin can perform this action!",
    })
  }
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
     return res.status(404).json({
        status: "Fail",
        message: "User not found!",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "User fetched successfully!",
      users: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

const updateUserById = async (req: AuthenticatedRequest, res: Response) => {
  const userId  = req.user;

  const user = await userModel.findOne({_id: userId});
  if (user?.role === "User") {
    return res.status(400).json({
      status: "Fail",
      message: "Only admin can perform this action!",
    })
  }
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedConfirmPassword = await bcrypt.hash(
      req.body.ConfirmPassword,
      salt
    );

    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        ConfirmPassword: hashedConfirmPassword,
      },
      { new: true }
    );

    if (!user) {
     return res.status(404).json({
        status: "Fail",
        message: "User not found!",
      });
    }

    await user?.save();

    res.status(200).json({
      status: "Success",
      message: "User updated successfully!",
      users: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

const deleteuser = async (req: AuthenticatedRequest, res: Response) => {
  const userId  = req.user;

  const user = await userModel.findOne({_id: userId});
  if (user?.role === "User") {
    return res.status(400).json({
      status: "Fail",
      message: "Only admin can perform this action!",
    })
  }
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
       return res.status(404).json({
          status: "Fail",
          message: "User not found!",
        });
      }

    res.status(200).json({
      status: "Success",
      message: "User deleted successfully!"
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
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
  deleteuser
};
