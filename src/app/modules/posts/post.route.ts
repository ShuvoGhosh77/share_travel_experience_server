import express from 'express';


import { PostController } from './post.controller';





const router = express.Router();

// router.get('/', CommentController.getAllFromDB);
router.post('/create_post',
PostController.insertIntoDB,);


export const postRoutes = router;