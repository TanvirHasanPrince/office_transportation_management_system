import express from 'express';
import { AdminController } from './admin.controller';
const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);
router.get('/', AdminController.getAllAdmins);

router.delete('/:id', AdminController.deleteAdmin);

router.post('/create-admin', AdminController.createAdmin);
router.patch('/:id', AdminController.updateAdmin);




export const AdminRoute = router;
