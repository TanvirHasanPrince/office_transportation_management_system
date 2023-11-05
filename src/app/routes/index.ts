import express from 'express';
import { AdminRoute } from '../modules/admin/admin.routes';
import { EmployeeRoute } from '../modules/employee/employee.routes';
import { DriverRoute } from '../modules/driver/driver.routes';


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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
