import express from 'express';
import { AdminController } from './admin.controller';
const router = express.Router();

router.get('/', AdminController.getAllAdmins);

router.post('/create-admin', AdminController.createAdmin);


export const AdminRoute = router;
