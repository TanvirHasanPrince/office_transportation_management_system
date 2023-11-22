import express from 'express';
import { DriverController } from './driver.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DriverValidation } from './driver.validation';

const router = express.Router();

router.get('/:id', DriverController.getSingleDriver);
router.get('/', DriverController.getAllDrivers);

router.delete('/:id', DriverController.deleteDriver);

router.post(
  '/create-driver',
  validateRequest(DriverValidation.createDriverZodSchema),
  DriverController.createDriver,
);

router.patch(
  '/:id',
  validateRequest(DriverValidation.updateDriverZodSchema),
  DriverController.updateDriver,
);

export const DriverRoute = router;
