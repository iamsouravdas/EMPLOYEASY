import { NextFunction, Request, Response } from 'express';
import { HttpCodes } from '../core/constants/httpCodes.constants';
import { UserAuthServices } from '../service/Auth/UserAuth.auth.service';

const userService = new UserAuthServices();

export class UserController {
    createNewUser = async (request: Request, response: Response, next: NextFunction) => {

        try {
            const requestBody = request.body;
            const user = await userService.createNewUser(requestBody);
            response.status(HttpCodes.OK).json(user);
        }
        catch (error) {
            next(error);
        }

    }

    login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = await userService.userLogin(request.body);
            response.status(HttpCodes.OK).json(user);
        }
        catch (error) {
            next(error);
        }
    }


    me = async (request: Request, response: Response, next: NextFunction) => {

        response.json(request);
    }
}