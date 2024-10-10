"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_route_1 = __importDefault(require("./router/index.route"));
const errorHandler_middleware_1 = require("./core/middlewares/errorHandler.middleware");
const helmet_1 = __importDefault(require("helmet"));
//Attaching Middlewares
const app = (0, express_1.default)();
// Configuring Middlewares
// This line adds middleware to the application that parses incoming requests with JSON payloads. 
// It allows the application to handle JSON data sent in requests, making it easier to work with the request body. 
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use("/ems/v1/api", index_route_1.default);
// Register the error-handling middleware at the end
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
