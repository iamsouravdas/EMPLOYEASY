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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const prismaConfig_config_1 = require("../../core/configs/prismaConfig.config");
const BaseRepository_1 = __importDefault(require("../../repository/base/BaseRepository"));
const helper_1 = require("../../core/utility/helper");
class EmployeeService {
    constructor(employeeRepository) {
        // Use dependency injection for the repository, allowing for flexibility
        this.employeeRepository = new BaseRepository_1.default(prismaConfig_config_1.prismaClient.employees);
    }
    //Get All Employees
    getAllEmployees(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.employeeRepository.getAll((0, helper_1.RecordPerPageNumber)(parseInt(data.pageNo), 5));
            }
            catch (error) {
                throw new Error("Failed to fetch employees");
            }
        });
    }
    //Get Employee By Id
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.employeeRepository.findUniqueRecord(id, 'emp_no');
            }
            catch (error) {
                console.error(error);
                throw new Error("Error while fetching the employee: ");
            }
        });
    }
    // EmployeeService.ts
    createEmployee(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Remove emp_no field since it is auto-incremented
                const newEmployee = yield this.employeeRepository.create(data);
                return newEmployee;
            }
            catch (error) {
                console.error(error);
                throw new Error("Error while creating an employee");
            }
        });
    }
    updateEmployee(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.employeeRepository.update(id, data, 'emp_no');
            }
            catch (error) {
                console.log(error);
                throw new Error("Error while updating an employee");
            }
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.employeeRepository.delete(id, 'emp_no');
            }
            catch (error) {
                console.log(error);
                throw new Error("Error while deleting an employee");
            }
        });
    }
}
exports.EmployeeService = EmployeeService;
