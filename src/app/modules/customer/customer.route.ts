import express from 'express';
import { CustomerController } from './customer.controller';


const router = express.Router();

router.get('/', CustomerController.getAllFromDB);
router.get('/:id', CustomerController.getByIdFromDB);
router.post(
    '/create_customer',CustomerController.insertIntoDB,
  
  );
router.patch(
  '/:id',CustomerController.updateOneInDB,

);

router.delete(
  '/:id',
  CustomerController.deleteByIdFromDB
);

export const customerRoutes = router;