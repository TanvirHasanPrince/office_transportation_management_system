import express from 'express';
import { UserController } from './auth.controller';
const router = express.Router();

router.post('/login', UserController.loginUser);


export const authRoutes = router;
