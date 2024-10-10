"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordPerPageNumber = exports.prismaClientModelFinder = exports.transform = void 0;
const prismaConfig_config_1 = require("../configs/prismaConfig.config");
const transform = (response) => {
    return new Promise((resolve, reject) => {
        const result = {
            data: response.data,
            succeeded: response.status === 200,
            errors: response.data.errors
        };
        resolve(result);
    });
};
exports.transform = transform;
// This method helps in finding whether the
const prismaClientModelFinder = (arg) => {
    if (arg in prismaConfig_config_1.prismaClient) {
        // @ts-ignore
        return prismaConfig_config_1.prismaClient[arg]; // Safely access the property
    }
    else {
        return false;
    }
};
exports.prismaClientModelFinder = prismaClientModelFinder;
//This method helps in giving records for page number
const RecordPerPageNumber = (pageNo, take) => {
    return {
        take: take,
        skip: (pageNo * take) - take
    };
};
exports.RecordPerPageNumber = RecordPerPageNumber;
