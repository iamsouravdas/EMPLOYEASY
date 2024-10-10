"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const configuration_configs_1 = require("../configs/configuration.configs");
const prismaConfig_config_1 = require("../configs/prismaConfig.config");
const httpCodes_constants_1 = require("../constants/httpCodes.constants");
const httpError_1 = require("../utility/httpError");
const authMiddleware = (req, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers.authorization;
    let token = header && header.split(' ')[1];
    if (!token) {
        return response.status(httpCodes_constants_1.HttpCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    try {
        // Verify token
        const payload = jwt.verify(token, configuration_configs_1.JWT_SECRET);
        // Fetch user from database
        const user = yield prismaConfig_config_1.prismaClient.employees.findUnique({ where: { emp_no: payload.employee_id } });
        if (!user) {
            throw new httpError_1.HttpError("Unauthorized", httpCodes_constants_1.HttpCodes.UNAUTHORIZED);
        }
        // Attach the user to the req object
        req.employee = user;
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            // Handle token expired error
            return response.status(httpCodes_constants_1.HttpCodes.UNAUTHORIZED).json({
                message: "Token has expired",
                error: "TokenExpiredError"
            });
        }
        // For other token-related errors, such as invalid tokens
        return response.status(httpCodes_constants_1.HttpCodes.UNAUTHORIZED).json({
            message: "Invalid token",
            error: "Something went wrong"
        });
    }
});
exports.authMiddleware = authMiddleware;
