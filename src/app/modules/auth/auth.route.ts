
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';




const router = express.Router();


router.post('/login', AuthController.loginUser);
router.post('/refresh-token',AuthController.refreshToken);

export const authRoutes = router;