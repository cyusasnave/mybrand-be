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
Object.defineProperty(exports, "__esModule", { value: true });
const security_helpers_1 = require("../helpers/security.helpers");
const authLogIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    if (!token || typeof token !== "string") {
        return res.status(498).json({
            status: "Fail",
            message: "Please logIn to continue!",
        });
    }
    try {
        const decoded = (0, security_helpers_1.verifyAccessToken)(token);
        if (decoded) {
            req.user = decoded.userId;
        }
        else {
            return res.status(401).json({
                status: "Fail",
                message: "Unauthorized, Please logIn to continue!",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(409).json({
            status: "Fail",
            message: "Please logIn to continue!",
        });
    }
    next();
});
exports.default = {
    authLogIn,
};
