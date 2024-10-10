import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../configs/configuration.configs";
import { prismaClient } from '../configs/prismaConfig.config';
import { HttpCodes } from '../constants/httpCodes.constants';
import { HttpError } from '../utility/httpError';
export const authMiddleware = async (req: Request, response: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    let token = header && header.split(' ')[1];
    if (!token) {
        return response.status(HttpCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    try {
        // Verify token
        const payload = jwt.verify(token, JWT_SECRET) as any;

        // Fetch user from database
        const user = await prismaClient.employees.findUnique({ where: { emp_no: payload.employee_id } });
        if (!user) {
            throw new HttpError("Unauthorized", HttpCodes.UNAUTHORIZED);
        }

        // Attach the user to the req object
        req.employee = user;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            // Handle token expired error
            return response.status(HttpCodes.UNAUTHORIZED).json({
                message: "Token has expired",
                error: "TokenExpiredError"
            });
        }

        // For other token-related errors, such as invalid tokens
        return response.status(HttpCodes.UNAUTHORIZED).json({
            message: "Invalid token",
            error: "Something went wrong"
        });
    }
};