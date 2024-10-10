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
exports.EmployeeController = void 0;
const Employee_service_1 = require("../service/Employee/Employee.service");
const httpCodes_constants_1 = require("../core/constants/httpCodes.constants");
const httpError_1 = require("../core/utility/httpError");
const employeeService = new Employee_service_1.EmployeeService();
class EmployeeController {
    constructor() {
        // Controller to get all employees
        this.getEmployees = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { pageNo } = request.query;
                const users = yield employeeService.getAllEmployees({ pageNo });
                if (!users) {
                    throw new httpError_1.HttpError('No employees found', httpCodes_constants_1.HttpCodes.NOT_FOUND);
                }
                response.status(httpCodes_constants_1.HttpCodes.OK).json(users);
            }
            catch (error) {
                next(error);
            }
        });
        // Controller for getting employees by id
        this.getEmployeeById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield employeeService.getEmployeeById(parseInt(request.params.id));
                if (!user) {
                    throw new httpError_1.HttpError(`Employee with the id ${request.params.id} not found`, httpCodes_constants_1.HttpCodes.NOT_FOUND);
                }
                response.status(httpCodes_constants_1.HttpCodes.OK).json(user);
            }
            catch (error) {
                next(error); // Pass error to the global error handler
            }
        });
        //Controller to create a new employee
        this.createNewEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield employeeService.createEmployee(request.body);
                if (!user) {
                    throw new httpError_1.HttpError('Error occurred while classes creating employee');
                }
                response.status(httpCodes_constants_1.HttpCodes.CREATED).json(user);
            }
            catch (error) {
                next(error);
            }
        });
        //Controller to update an existing employee's record
        this.updateEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // if (!request.params.id || request.body) {
                //     throw new HttpError('Either employee id or the payload is missing', HttpCodes.BAD_REQUEST)
                // }
                const user = yield employeeService.updateEmployee(parseInt(request.params.id), request.body);
                if (!user) {
                    throw new httpError_1.HttpError('Something went wrong while updating');
                }
                response.status(httpCodes_constants_1.HttpCodes.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
        //Controller to delete an employee
        this.deleteEmployee = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!request.params.id) {
                    throw new httpError_1.HttpError('Employee id is missing', httpCodes_constants_1.HttpCodes.BAD_REQUEST);
                }
                const user = yield employeeService.deleteEmployee(parseInt(request.params.id));
                if (!user) {
                    throw new httpError_1.HttpError('Employee with the id ${request.params.id} not found', httpCodes_constants_1.HttpCodes.NOT_FOUND);
                }
                response.status(httpCodes_constants_1.HttpCodes.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.EmployeeController = EmployeeController;
