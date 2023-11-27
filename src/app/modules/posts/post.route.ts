import express, { NextFunction, Request, Response } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { PostController } from './post.controller';
import auth from '../../middlewares/auth';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';





const router = express.Router();

// router.get('/', CommentController.getAllFromDB);


router.post(
    '/create_post',
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        const parsedBody = JSON.parse(req.body.data);
        req.body = parsedBody ;
        return PostController.insertIntoDB(req, res, next)
    }
);


export const postRoutes = router;