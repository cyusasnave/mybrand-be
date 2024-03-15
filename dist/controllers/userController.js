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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const security_helpers_1 = require("../helpers/security.helpers");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(409).json({
            status: "Fail",
            message: `User with email ${req.body.email} already exists in our system!`,
        });
    }
    try {
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        const hashedConfirmPassword = yield bcrypt_1.default.hash(req.body.ConfirmPassword, salt);
        const newUser = new userModel_1.default({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            ConfirmPassword: hashedConfirmPassword,
        });
        yield newUser.save();
        return res.status(201).json({
            status: "Success",
            message: "User created successfully!",
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
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid user or password. Please try again!",
        });
    }
    const isTruePassword = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!isTruePassword) {
        return res.status(400).json({
            status: "Fail",
            message: "Invalid User or password. Please try again!",
        });
    }
    try {
        const token = (0, security_helpers_1.generateAccessToken)(user);
        return res.status(200).json({
            status: "Success",
            message: "User logged In Successfully!",
            token: token,
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
const loggedInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (user) {
        return res.status(200).json({
            status: "Success",
            message: "LoggedIn user fetched successfully!",
            user: user,
        });
    }
    else {
        return res.status(400).json({
            status: "Fail",
            message: "User not found!",
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({});
        res.status(200).json({
            status: "Success",
            message: "Users fetched successfully!",
            users: users,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        const hashedConfirmPassword = yield bcrypt_1.default.hash(req.body.ConfirmPassword, salt);
        const user = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            ConfirmPassword: hashedConfirmPassword,
        }, { new: true });
        if (!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found!",
            });
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).json({
            status: "Success",
            message: "User updated successfully!",
            users: user,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findByIdAndDelete(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
exports.default = {
    createUser,
    logIn,
    loggedInUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteuser
};
