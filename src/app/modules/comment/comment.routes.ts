import express from 'express';


import { CommentController } from './comment.controller';
import auth from '../../middlewares/auth';



const router = express.Router();

router.get('/:PostId',auth("Admin"), CommentController.getByIdFromDB);
router.post('/create_comment',CommentController.insertIntoDB,);
router.patch('/:id/comment_replies',CommentController.repliesComment);


export const commentRoutes = router;