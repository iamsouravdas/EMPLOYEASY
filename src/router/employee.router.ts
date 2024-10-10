import { Router } from 'express';
import { EmployeeController } from '../controllers/Employee.controller';
import { authMiddleware } from '../core/middlewares/authMiddleware.middlewares';

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.get("/get-all-employees", [authMiddleware], employeeController.getEmployees);
employeeRouter.get("/get-employees-by-id/:id", [authMiddleware], employeeController.getEmployeeById);
employeeRouter.post("/create-new-employee", [authMiddleware], employeeController.createNewEmployee);
employeeRouter.put("/update-employee/:id", [authMiddleware], employeeController.updateEmployee);
employeeRouter.delete("/delete-employee/:id", [authMiddleware], employeeController.deleteEmployee);
export default employeeRouter;