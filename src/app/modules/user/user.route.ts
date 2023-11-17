
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';



const router = express.Router();


router.post('/create_admin', UserController.insertIntoDB);


export const userRoutes = router;