import express from 'express';
import { EmployeeController } from './employee.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EmployeeValidation } from './employee.validation';

const router = express.Router();

router.get('/:id', EmployeeController.getSingleEmployee);
router.get('/', EmployeeController.getAllEmployees);

router.delete('/:id', EmployeeController.deleteEmployee);

router.post(
  '/create-employee',
  validateRequest(EmployeeValidation.createEmployeeZodSchema),
  EmployeeController.createEmployee,
);
router.patch(
  '/:id',
  validateRequest(EmployeeValidation.updateEmployeeZodSchema),
  EmployeeController.updateEmployee,
);

export const EmployeeRoute = router;
