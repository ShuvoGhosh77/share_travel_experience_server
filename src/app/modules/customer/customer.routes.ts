import express from 'express';
import { CustomerController } from './customer.controller';


const router = express.Router();

router.get('/', CustomerController.getAllFromDB);

router.post(
  '/create_customer',CustomerController.insertIntoDB
);
export const customerRoutes = router;