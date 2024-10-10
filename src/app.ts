import express from 'express';
import indexRoute from './router/index.route';
import { errorHandler } from './core/middlewares/errorHandler.middleware';
import helmet from 'helmet';
import { corsOptions } from './core/configs/configuration.configs';
import cors from 'cors';

//Attaching Middlewares
const app = express();
// Configuring Middlewares
// This line adds middleware to the application that parses incoming requests with JSON payloads. 
// It allows the application to handle JSON data sent in requests, making it easier to work with the request body. 
app.use(express.json());
app.use(cors(corsOptions))
app.use(helmet())
app.use("/ems/v1/api", indexRoute);
// Register the error-handling middleware at the end
app.use(errorHandler);

export default app;
