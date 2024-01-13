import express from 'express';
import { OrderController } from './order.controller';





const router = express.Router();

router.get('/', OrderController.getAllFromDB);
router.post('/create_order',OrderController.insertIntoDB);
router.delete(
  '/:id',
  OrderController.deleteByIdFromDB
);



export const orderRoutes = router;