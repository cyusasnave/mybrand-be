"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userValidation = joi_1.default.object({
    name: joi_1.default.string().required().min(2).regex(/^[A-Za-z\s]+$/).messages({
        "string.empty": "Name field can't be empty!",
        "string.min": "Name must be a least 2 character long!",
        "string.pattern.base": "Name can't include numbers and special characters!"
    }),
    email: joi_1.default.string().required().email().messages({
        "string.empty": "Email field can't be empty!",
        "string.email": "Invalid email"
    }),
    password: joi_1.default.string().required().regex(/^(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{5,}$/).messages({
        "string.empty": "Password can't be empty!",
        "string.pattern.base": "Password must at least have one capital letter, a special character and a number!"
    }),
    ConfirmPassword: joi_1.default.string().required().equal(joi_1.default.ref('password')).messages({
        "any.only": "Password don't match!"
    })
});
const validateUser = (data) => {
    return userValidation.validate(data);
};
exports.default = validateUser;
