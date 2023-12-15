import express from 'express';
import { commentRoutes } from '../modules/comment/comment.routes';
import { postRoutes } from '../modules/posts/post.route';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';



const router = express.Router();

const moduleRoutes = [
  // ... routes
 
  {
    path: '/comment',
    route: commentRoutes
  },
  {
    path: '/post',
    route: postRoutes
  },
  {
    path: '/user',
    route: userRoutes
  },
  {
    path: '/auth',
    route: authRoutes
  },

];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
