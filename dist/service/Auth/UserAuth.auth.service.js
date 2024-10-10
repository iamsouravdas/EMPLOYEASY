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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthServices = void 0;
const prismaConfig_config_1 = require("../../core/configs/prismaConfig.config");
const httpError_1 = require("../../core/utility/httpError");
const BaseRepository_1 = __importDefault(require("../../repository/base/BaseRepository"));
const Employee_service_1 = require("../Employee/Employee.service");
const httpCodes_constants_1 = require("../../core/constants/httpCodes.constants");
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const configuration_configs_1 = require("../../core/configs/configuration.configs");
class UserAuthServices {
    constructor(userRepository, employeeService) {
        this.userRepository = userRepository || new BaseRepository_1.default(prismaConfig_config_1.prismaClient.users);
        this.employeeService = employeeService || new Employee_service_1.EmployeeService();
    }
    // Create New User Account
    createNewUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //checks whether the user already exists or not
            const user = yield this.userRepository.findUniqueRecord(data.emp_email_address, 'emp_email_address');
            if (user) {
                throw Error("User already exist");
            }
            // Step 1: Create the employee
            const employeeData = {
                emp_no: data.emp_no,
                birth_date: data.birth_date,
                first_name: data.first_name,
                last_name: data.last_name,
                gender: data.gender,
                hire_date: data.hire_date,
            };
            //Creating Employee First
            const createdEmployee = yield this.employeeService.createEmployee(employeeData);
            if (!createdEmployee) {
                throw new httpError_1.HttpError("something went wrong while creating an employee", httpCodes_constants_1.HttpCodes.INTERNAL_SERVER_ERROR);
            }
            // Step 2: Create the user with the emp_no from the employee
            const createdUser = yield this.userRepository.create({
                emp_no: createdEmployee.emp_no, // Use emp_no from createdEmployee
                emp_email_address: data.emp_email_address,
                emp_password: (0, bcrypt_1.hashSync)(data.emp_password, 10),
                dept_no: data.dept_no
            });
            return createdUser;
        });
    }
    //creating user login
    userLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            let user = yield prismaConfig_config_1.prismaClient.users.findFirst({
                where: {
                    emp_email_address: email,
                },
                include: {
                    employees: true
                }
            });
            if (!user) {
                throw new httpError_1.HttpError("User Not found", httpCodes_constants_1.HttpCodes.NOT_FOUND);
            }
            if (!password || !(0, bcrypt_1.compareSync)(password, user.emp_password)) {
                throw new httpError_1.HttpError("Incorrect Password or password not provided");
            }
            const token = jwt.sign({
                employee_id: user.emp_no
            }, configuration_configs_1.JWT_SECRET, { expiresIn: '1h' });
            // Construct and return the full response object
            return {
                data: {
                    emp_no: user.employees.emp_no,
                    birth_date: user.employees.birth_date,
                    first_name: user.employees.first_name,
                    last_name: user.employees.last_name,
                    gender: user.employees.gender,
                    hire_date: user.employees.hire_date,
                    emp_email_address: user.emp_email_address,
                    dept_no: user.dept_no
                },
                token: token
            };
        });
    }
}
exports.UserAuthServices = UserAuthServices;
