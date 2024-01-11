import express, { NextFunction, Request, Response } from 'express';
import { guideController } from './guide.controller';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';

const router = express.Router();

router.get('/', guideController.getAllFromDB);
router.get('/:id', guideController.getByIdFromDB);
router.post(
  '/create_guide',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return guideController.insertIntoDB(req, res, next);
  }
);

router.patch('/:id', guideController.updateOneInDB);

router.delete('/:id', guideController.deleteByIdFromDB);

export const guideRoutes = router;
