import dotenv from 'dotenv';


dotenv.config({ path: '.env' });

export const PORT = process.env.DEV_PORT || 6001
export const JWT_SECRET = process.env.JWT_SECRET || 'abcd12345787f44fd';

export const corsOptions = {
    origin: '*',  // Allow only this domain
    methods: 'GET,POST,PUT,DELETE',       // Specify allowed methods
    allowedHeaders: 'Content-Type,Authorization',  // Specify allowed headers
    credentials: true,               // Allow cookies (if needed)
};