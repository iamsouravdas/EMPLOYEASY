import { employees, users } from "@prisma/client";
import { prismaClient } from "../../core/configs/prismaConfig.config";
import { HttpError } from "../../core/utility/httpError";
import { createNewUserDto, newUserCreationResponseDto, userLogin } from "../../dto/CustomDtos";
import BaseRepository from "../../repository/base/BaseRepository";
import { IBaseRepository } from "../../repository/base/IBaseRepository";
import { EmployeeService } from "../Employee/Employee.service";
import { HttpCodes } from "../../core/constants/httpCodes.constants";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../core/configs/configuration.configs";

export class UserAuthServices {
    private userRepository: IBaseRepository<users>;
    private employeeService: EmployeeService; // Declare the EmployeeService instance
    constructor(userRepository?: IBaseRepository<users>, employeeService?: EmployeeService) {
        this.userRepository = userRepository || new BaseRepository(prismaClient.users);
        this.employeeService = employeeService || new EmployeeService();
    }

    // Create New User Account
    async createNewUser(data: createNewUserDto) {
        //checks whether the user already exists or not
        const user = await this.userRepository.findUniqueRecord(data.emp_email_address, 'emp_email_address');
        if (user) {
            throw Error("User already exist")
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
        const createdEmployee = await this.employeeService.createEmployee(employeeData) as employees;
        if (!createdEmployee) {
            throw new HttpError("something went wrong while creating an employee", HttpCodes.INTERNAL_SERVER_ERROR);
        }
        // Step 2: Create the user with the emp_no from the employee
        const createdUser = await this.userRepository.create({
            emp_no: createdEmployee.emp_no, // Use emp_no from createdEmployee
            emp_email_address: data.emp_email_address,
            emp_password: hashSync(data.emp_password, 10),
            dept_no: data.dept_no
        });

        return createdUser;
    }

    //creating user login

    async userLogin(data: userLogin): Promise<newUserCreationResponseDto> {
        const { email, password } = data
        let user = await prismaClient.users.findFirst({
            where: {
                emp_email_address: email,
            },
            include: {
                employees: true
            }
        });

        if (!user) {
            throw new HttpError("User Not found", HttpCodes.NOT_FOUND);
        }
        if (!password || !compareSync(password, user.emp_password)) {
            throw new HttpError("Incorrect Password or password not provided");
        }

        const token = jwt.sign({
            employee_id: user.emp_no
        }, JWT_SECRET, { expiresIn: '1h' });

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
        } as newUserCreationResponseDto;

    }
}