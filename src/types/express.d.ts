
import { employees } from '@prisma/client';
import express from 'express';

declare module 'express' {
    export interface Request {
        employee?: employees;
    }
}
