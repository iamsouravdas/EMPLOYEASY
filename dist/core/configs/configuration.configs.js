"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.JWT_SECRET = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
exports.PORT = process.env.DEV_PORT || 6001;
exports.JWT_SECRET = process.env.JWT_SECRET || 'abcd12345787f44fd';
exports.corsOptions = {
    origin: '*', // Allow only this domain
    methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
    credentials: true, // Allow cookies (if needed)
};
