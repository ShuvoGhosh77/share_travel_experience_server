import express from 'express';


import { CommentController } from './comment.controller';




const router = express.Router();

router.get('/:PostId', CommentController.getByIdFromDB);
router.post('/create_comment',CommentController.insertIntoDB,);



export const commentRoutes = router;