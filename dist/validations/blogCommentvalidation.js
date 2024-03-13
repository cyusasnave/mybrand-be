"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const commentValidation = joi_1.default.object({
    comment: joi_1.default.string().required().messages({
        "string.empty": "Comment field can't be empty!"
    })
});
const validComment = (data) => {
    return commentValidation.validate(data);
};
exports.default = validComment;
