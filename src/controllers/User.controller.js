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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const httpCodes_constants_1 = require("../core/constants/httpCodes.constants");
const UserAuth_auth_service_1 = require("../service/Auth/UserAuth.auth.service");
const userService = new UserAuth_auth_service_1.UserAuthServices();
class UserController {
    constructor() {
        this.createNewUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = request.body;
                const user = yield userService.createNewUser(requestBody);
                response.status(httpCodes_constants_1.HttpCodes.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userService.userLogin(request.body);
                response.status(httpCodes_constants_1.HttpCodes.OK).json(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.me = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            response.json(request);
        });
    }
}
exports.UserController = UserController;
