import { employees } from '@prisma/client';
import { prismaClient } from '../../core/configs/prismaConfig.config';
import { createEmployeeDto } from '../../dto/CustomDtos';
import BaseRepository from '../../repository/base/BaseRepository';
import { IBaseRepository } from '../../repository/base/IBaseRepository';
import { RecordPerPageNumber } from '../../core/utility/helper';

export class EmployeeService {
    private employeeRepository: IBaseRepository<employees>;
    constructor(employeeRepository?: IBaseRepository<employees>) {
        // Use dependency injection for the repository, allowing for flexibility
        this.employeeRepository = new BaseRepository(prismaClient.employees);
    }
    //Get All Employees
    async getAllEmployees(data: any): Promise<employees[]> {

        try {

            return this.employeeRepository.getAll(RecordPerPageNumber(parseInt(data.pageNo), 5));
        }
        catch (error) {
            throw new Error("Failed to fetch employees");
        }
    }
    //Get Employee By Id
    async getEmployeeById(id: any): Promise<employees> {
        try {
            return this.employeeRepository.findUniqueRecord(id, 'emp_no');
        } catch (error) {
            console.error(error);
            throw new Error("Error while fetching the employee: ");
        }
    }
    // EmployeeService.ts
    async createEmployee(data: createEmployeeDto): Promise<employees> {
        try {
            // Remove emp_no field since it is auto-incremented
            const newEmployee = await this.employeeRepository.create(data);
            return newEmployee;
        } catch (error) {
            console.error(error);
            throw new Error("Error while creating an employee");
        }
    }

    async updateEmployee(id: number, data: createEmployeeDto): Promise<employees> {
        try {
            return await this.employeeRepository.update(id, data, 'emp_no')
        }
        catch (error) {
            console.log(error);
            throw new Error("Error while updating an employee")
        }
    }

    async deleteEmployee(id: number): Promise<employees> {
        try {
            return await this.employeeRepository.delete(id, 'emp_no')
        } catch (error) {
            console.log(error);
            throw new Error("Error while deleting an employee")
        }
    }

    //Custom Services
    //TODO: 1. Create a custom service taking input as employee id and giving that employee details along with salary


}