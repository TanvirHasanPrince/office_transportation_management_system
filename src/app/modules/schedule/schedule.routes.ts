import express from 'express';
import { ScheduleController } from './schedule.controller';

const router = express.Router();

router.get('/', ScheduleController.getAllSchedules);

router.post(
  '/create-schedule',
  ScheduleController.createSchedule,
);

router.delete('/:id', ScheduleController.deleteSchedule);


export const ScheduleRoute = router;
