"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querriesModel_1 = __importDefault(require("../models/querriesModel"));
const addQuerries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querry = new querriesModel_1.default({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });
        yield querry.save();
        res.status(201).json({
            status: "Succes",
            message: "Querry Sent successfully!",
            querry: querry,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
const getAllQuerries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querries = yield querriesModel_1.default.find({});
        res.status(200).json({
            status: "Success",
            message: "Querries fetched successfully!",
            Querries: querries,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
const getQuerryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const singleQuerry = yield querriesModel_1.default.findById(id);
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
const updateQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const querry = yield querriesModel_1.default.findByIdAndUpdate(id, {
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
        yield (querry === null || querry === void 0 ? void 0 : querry.save());
        return res.status(200).json({
            status: "Success",
            message: "Querry updated successfully!",
            Querry: querry,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
const deleteQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                status: "Fail",
                message: "Querry not found!",
            });
        }
        yield querriesModel_1.default.findByIdAndDelete(id);
        res.status(200).json({
            status: "Success",
            message: "Querry deleted successfully!",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
exports.default = {
    addQuerries,
    getAllQuerries,
    getQuerryById,
    updateQuerry,
    deleteQuerry,
};
