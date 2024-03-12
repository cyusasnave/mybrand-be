"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const blogValidation = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "string.empty": "Blog title field can't be empty!"
    }),
    content: joi_1.default.string().required().messages({
        "string.empty": "Blog content field can't be empty!"
    })
});
const validateBlog = (data) => {
    return blogValidation.validate(data);
};
exports.default = validateBlog;
