import express from 'express';
import { DriverController } from './driver.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DriverValidation } from './driver.validation';


const router = express.Router();

router.post('/create-driver', validateRequest(DriverValidation.createDriverZodSchema), DriverController.createDriver);

export const DriverRoute = router;
