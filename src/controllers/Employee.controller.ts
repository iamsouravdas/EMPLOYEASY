
import { NextFunction, Request, Response } from 'express';
import { EmployeeService } from "../service/Employee/Employee.service";
import { HttpCodes } from '../core/constants/httpCodes.constants';
import { HttpError } from '../core/utility/httpError';

const employeeService = new EmployeeService();

export class EmployeeController {
    // Controller to get all employees
    getEmployees = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const {pageNo} = request.query;
            
            const users = await employeeService.getAllEmployees({pageNo});
            if (!users) {
                throw new HttpError('No employees found', HttpCodes.NOT_FOUND);
            }
            response.status(HttpCodes.OK).json(users);
        } catch (error) {
            next(error)
        }
    }

    // Controller for getting employees by id
    getEmployeeById = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = await employeeService.getEmployeeById(parseInt(request.params.id));
            if (!user) {
                throw new HttpError(`Employee with the id ${request.params.id} not found`,
                    HttpCodes.NOT_FOUND);
            }
            response.status(HttpCodes.OK).json(user);
        } catch (error) {
            next(error); // Pass error to the global error handler
        }
    }

    //Controller to create a new employee
    createNewEmployee = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = await employeeService.createEmployee(request.body);
            if (!user) {
                throw new HttpError('Error occurred while classes creating employee')
            }
            response.status(HttpCodes.CREATED).json(user);
        } catch (error) {
            next(error)
        }
    }

    //Controller to update an existing employee's record
    updateEmployee = async (request: Request, response: Response, next: NextFunction) => {
        try {
            // if (!request.params.id || request.body) {
            //     throw new HttpError('Either employee id or the payload is missing', HttpCodes.BAD_REQUEST)
            // }
            const user = await employeeService.updateEmployee(parseInt(request.params.id), request.body);
            if (!user) {
                throw new HttpError('Something went wrong while updating')
            }
            response.status(HttpCodes.OK).json(user)
        }
        catch (error) {
            next(error);
        }
    }

    //Controller to delete an employee
    deleteEmployee = async (request: Request, response: Response, next: NextFunction) => {
        try {
            if (!request.params.id) {
                throw new HttpError('Employee id is missing', HttpCodes.BAD_REQUEST)
            }
            const user = await employeeService.deleteEmployee(parseInt(request.params.id));
            if (!user) {
                throw new HttpError('Employee with the id ${request.params.id} not found', HttpCodes.NOT_FOUND);
            }
            response.status(HttpCodes.OK).json(user);
        } catch (error) {
            next(error)
        }
    }

}