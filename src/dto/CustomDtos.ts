
import { employees, users } from "@prisma/client";

// Create a DTO that omits `emp_no` for creating new employees
export type createEmployeeDto = employees;
export type usersDto = Omit<users, 'emp_no'>;
export type createNewUserDto = createEmployeeDto & usersDto;
export type newUserCreationResponseDto = {
    data: employees & Omit<users, 'emp_no'>,
    token: string

}


export type userLogin = {
    email: string,
    password: string
}
