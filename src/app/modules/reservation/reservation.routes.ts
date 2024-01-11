import express from 'express';
import { ReservationController } from './reservation.controller';



const router = express.Router();

router.get('/', ReservationController.getAllFromDB);
router.post('/create_reservation',ReservationController.insertIntoDB);
router.patch('/:id',ReservationController.updateOneInDB);
router.delete('/:id',ReservationController.deleteByIdFromDB);


export const ReservationRoutes = router;