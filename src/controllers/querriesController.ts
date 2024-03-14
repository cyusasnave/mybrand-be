import { Request, Response } from "express";
import querriesModel from "../models/querriesModel";

const addQuerries = async (req: Request, res: Response) => {
  try {
    const querry = new querriesModel({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    await querry.save();

    res.status(201).json({
      status: "Succes",
      message: "Querry Sent successfully!",
      querry: querry,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

const getAllQuerries = async (req: Request, res: Response) => {
  try {
    const querries = await querriesModel.find({});

    res.status(200).json({
      status: "Success",
      message: "Querries fetched successfully!",
      Querries: querries,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

const getQuerryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    
    const singleQuerry = await querriesModel.findById(id);
    
    if (!singleQuerry) {
      return res.status(404).json({
        status: "Fail",
        message: "Querry not found!",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Querry fetched successfully!",
      Querry: singleQuerry,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

const updateQuerry = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const querry = await querriesModel.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    }, { new: true });

    if (!querry) {
        return res.status(404).json({
          status: "Fail",
          message: "Querry not found!",
        });
      }

    await querry?.save();

   return res.status(200).json({
      status: "Success",
      message: "Querry updated successfully!",
      Querry: querry,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

const deleteQuerry = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        status: "Fail",
        message: "Querry not found!",
      });
    }

    await querriesModel.findByIdAndDelete(id);

    res.status(200).json({
      status: "Success",
      message: "Querry deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Something went wrong!",
    });
  }
};

export default {
  addQuerries,
  getAllQuerries,
  getQuerryById,
  updateQuerry,
  deleteQuerry,
};
