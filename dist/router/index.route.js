"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_router_1 = __importDefault(require("./employee.router"));
const user_router_1 = require("./user.router");
const indexRoute = (0, express_1.Router)();
indexRoute.use("/employee", employee_router_1.default);
indexRoute.use("/user", user_router_1.userRouter);
exports.default = indexRoute;
