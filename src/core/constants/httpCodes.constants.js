"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCodes = void 0;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["CREATED"] = 201] = "CREATED";
    HttpCodes[HttpCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCodes[HttpCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCodes[HttpCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCodes[HttpCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCodes[HttpCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCodes || (exports.HttpCodes = HttpCodes = {}));
