import express from 'express';
import { RoomController } from './room.controller';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidation } from './room.validations';


const router = express.Router();

router.get('/', RoomController.getAllFromDB);
router.get('/:id', RoomController.getByIdFromDB);
router.post(
  '/create_room',RoomController.insertIntoDB,
  validateRequest(RoomValidation.create)
);
router.patch(
  '/:id',RoomController.updateOneInDB,
  validateRequest(RoomValidation.update)
);

router.delete(
  '/:id',
  RoomController.deleteByIdFromDB
);

export const roomRoutes = router;