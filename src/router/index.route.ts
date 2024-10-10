import { Router } from 'express';
import employeeRouter from './employee.router';
import { userRouter } from './user.router';


const indexRoute: Router = Router();

indexRoute.use("/employee", employeeRouter);
indexRoute.use("/user", userRouter)


export default indexRoute;


