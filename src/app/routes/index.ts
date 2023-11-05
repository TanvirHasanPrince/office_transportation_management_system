import express from 'express';
import { AdminRoute } from '../modules/admin/admin.routes';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/admin',
    route: AdminRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
