export class ApiResponse<T>{
    data?: T;
    succeeded?: boolean;
    errors?: any;
    token?: string;
}

