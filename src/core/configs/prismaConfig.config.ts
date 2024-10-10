import { PrismaClient } from "@prisma/client";

//Configuring Prisma Client
export const prismaClient = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
});
