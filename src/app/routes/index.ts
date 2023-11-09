import express from 'express';
import { AdminRoute } from '../modules/admin/admin.routes';
import { EmployeeRoute } from '../modules/employee/employee.routes';
import { DriverRoute } from '../modules/driver/driver.routes';
import { LocationRoute } from '../modules/location/location.routes';
import { ScheduleRoute } from '../modules/schedule/schedule.routes';
import { authRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/admin',
    route: AdminRoute,
  },
  {
    path: '/employee',
    route: EmployeeRoute,
  },
  {
    path: '/driver',
    route: DriverRoute,
  },
  {
    path: '/location',
    route: LocationRoute,
  },
  {
    path: '/schedule',
    route: ScheduleRoute,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
