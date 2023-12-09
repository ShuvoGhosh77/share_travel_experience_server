import express, { NextFunction, Request, Response } from 'express';


import { PostController } from './post.controller';

import { FileUploadHelper } from '../../../helpers/FileUploadHelper';





const router = express.Router();

// router.get('/', CommentController.getAllFromDB);

router.get('/', PostController.getAllFromDB);
router.get('/:id', PostController.getByIdFromDB);
router.post(
    '/create_post',
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        const parsedBody = JSON.parse(req.body.data);
        req.body = parsedBody ;
        return PostController.insertIntoDB(req, res, next)
    }
);
router.patch(
    '/:id',PostController.updateOneInDB,
  );
  
  router.delete(
    '/:id',
    PostController.deleteByIdFromDB
  );

export const postRoutes = router;