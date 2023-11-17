
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';




const router = express.Router();


router.post('/login', AuthController.loginUser);


export const authRoutes = router;