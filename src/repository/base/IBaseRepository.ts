
export interface IBaseRepository<T> {
    findUniqueRecord(id: any, genericIdentifierKey: any): Promise<T>;
    getAll(data: { take: number, skip: number }): Promise<T[]>;
    create(data: any): Promise<T>
    update(id: any, data: T, genericIdentifierKey: any): Promise<T>
    delete(id: any, genericIdentifierKey: any): Promise<T>
}