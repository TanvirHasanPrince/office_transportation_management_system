import express from 'express';
import { ScheduleController } from './schedule.controller';

const router = express.Router();

router.get('/', ScheduleController.getAllSchedules);

router.post(
  '/create-schedule',
  ScheduleController.createSchedule,
);


export const ScheduleRoute = router;
