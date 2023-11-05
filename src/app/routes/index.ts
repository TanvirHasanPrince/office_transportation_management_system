import express from 'express';
import { AdminRoute } from '../modules/admin/admin.routes';
import { EmployeeRoute } from '../modules/employee/employee.routes';


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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
