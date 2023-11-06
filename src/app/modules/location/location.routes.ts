import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { LocationValidation } from './location.validation';
import { LocationController } from './location.controller';

const router = express.Router();

router.post(
  '/create-Location',
  validateRequest(LocationValidation.createLocationZodSchema),
  LocationController.createLocation,
);
router.get('/:id', LocationController.getSingleLocation);
router.get('/', LocationController.getAllLocations);

router.delete('/:id', LocationController.deleteLocation);


export const LocationRoute = router;