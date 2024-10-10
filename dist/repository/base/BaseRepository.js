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
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    //  Get all the data 
    getAll(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findMany({
                take: data.take,
                skip: data.skip
            });
        });
    }
    //Get method by id
    findUniqueRecord(id, genericIdentifierKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findFirst({
                where: { [genericIdentifierKey]: id },
            });
        });
    }
    //Create a new data 
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.create({
                data
            });
        });
    }
    //Update a data based on the data provided and id passed
    update(id, data, genericIdentifierKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.update({
                where: { [genericIdentifierKey]: id },
                data
            });
        });
    }
    // Delete a data 
    delete(id, genericIdentifierKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.delete({
                where: { [genericIdentifierKey]: id }
            });
        });
    }
}
exports.BaseRepository = BaseRepository;
exports.default = BaseRepository;
