"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateAccessToken = (userId) => {
    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const token = jsonwebtoken_1.default.sign({ userId }, tokenSecret, {
        expiresIn: "30 min"
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (token) => {
    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
    return jsonwebtoken_1.default.verify(String(token), tokenSecret);
};
exports.verifyAccessToken = verifyAccessToken;
