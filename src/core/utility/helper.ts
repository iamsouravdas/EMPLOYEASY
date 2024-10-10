import { PrismaClient } from "@prisma/client";
import { AxiosResponse } from "axios";
import { prismaClient } from "../configs/prismaConfig.config";
import { ApiResponse } from "../../dto/root/ApiResponse.root";

export const transform = (response: AxiosResponse): Promise<ApiResponse<any>> => {
    return new Promise((resolve, reject) => {
        const result: ApiResponse<any> = {
            data: response.data,
            succeeded: response.status === 200,
            errors: response.data.errors
        }
        resolve(result);
    })
}
// This method helps in finding whether the
export const prismaClientModelFinder = (arg: keyof PrismaClient) => {
    if (arg in prismaClient) {
        // @ts-ignore
        return prismaClient[arg]  // Safely access the property
    } else {
        return false;
    }
}

//This method helps in giving records for page number
export const RecordPerPageNumber = (pageNo: number, take: number) => {  
    return {
        take: take,
        skip: (pageNo * take) - take
    }
}