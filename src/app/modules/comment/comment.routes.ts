import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { CommentController } from './comment.controller';



const router = express.Router();

router.get('/:PostId', CommentController.getByIdFromDB);
router.post('/create_comment',CommentController.insertIntoDB,);
router.patch('/:id/comment_replies',CommentController.repliesComment);


export const commentRoutes = router;