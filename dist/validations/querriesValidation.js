"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const querriesValidation = joi_1.default.object({
    name: joi_1.default.string().required().min(2).regex(/^[A-Za-z\s]+$/).messages({
        "string.empty": "Name field can't be empty!",
        "string.pattern.base": "Name can't include numbers and special characters!",
        "string.min": "Name length must be at least 2 characters long!"
    }),
    email: joi_1.default.string().required().email().messages({
        "string.empty": "Email field can't be empty!",
        "string.email": "Invalid email!"
    }),
    message: joi_1.default.string().required().min(2).messages({
        "string.empty": "message field can't be empty!",
        "string.min": "Message length must be at least 2 character long!"
    })
});
const validateQuerry = (data) => {
    return querriesValidation.validate(data);
};
exports.default = validateQuerry;
