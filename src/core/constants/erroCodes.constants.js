"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = void 0;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["INTERNAL_SERVER_ERROR"] = 1000] = "INTERNAL_SERVER_ERROR";
    ErrorCodes[ErrorCodes["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCodes[ErrorCodes["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCodes[ErrorCodes["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCodes[ErrorCodes["UNPROCESSABLE_ENTITY"] = 1004] = "UNPROCESSABLE_ENTITY";
    ErrorCodes[ErrorCodes["UNAUTHORIZED"] = 3000] = "UNAUTHORIZED";
    ErrorCodes[ErrorCodes["INTERNAL_EXCEPTION"] = 3001] = "INTERNAL_EXCEPTION";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
