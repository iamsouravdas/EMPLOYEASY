import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utility/httpError';

/**
 * Error handling middleware for Express applications.
 *
 * @param {HttpError} err - The error object that was thrown.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const errorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Determine the status code from the error, defaulting to 500 (Internal Server Error) if not specified.
    const statusCode = err.statusCode || 500;

    // Extract the error message or default to a generic internal server error message.
    const message = err.message || 'Internal Server Error';

    // Log the full error stack trace to the console for debugging purposes.
    // You might consider logging this to a file or an external logging service in a production environment.
    console.error(`[Error]: ${err.stack}`);

    // Send a JSON response to the client with the error details.
    res.status(statusCode).json({
        success: false, // Indicate the request was not successful.
        message: message, // Provide the error message.
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Include the stack trace in development only.
    });
}