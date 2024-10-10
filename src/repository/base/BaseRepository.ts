import { IBaseRepository } from "./IBaseRepository";

export class BaseRepository<T> implements IBaseRepository<T> {
    constructor(private model: any) { }
    //  Get all the data 
    async getAll(data: { take: number, skip: number }): Promise<T[]> {

        return this.model.findMany(
            {
                take: data.take,
                skip: data.skip
            }
        );
    }

    //Get method by id
    async findUniqueRecord(id: any, genericIdentifierKey: any): Promise<T> {
        return this.model.findFirst({
            where: { [genericIdentifierKey]: id },
        });
    }

    //Create a new data 
    async create(data: any): Promise<T> {
        return this.model.create({
            data
        });
    }

    //Update a data based on the data provided and id passed
    async update(id: any, data: T, genericIdentifierKey: any): Promise<T> {
        return this.model.update({
            where: { [genericIdentifierKey]: id },
            data
        });
    }

    // Delete a data 
    async delete(id: any, genericIdentifierKey: any): Promise<T> {
        return this.model.delete({
            where: { [genericIdentifierKey]: id }
        })
    }
}

export default BaseRepository;