import express from 'express';
import { commentRoutes } from '../modules/comment/comment.routes';
import { postRoutes } from '../modules/posts/post.route';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { customerRoutes } from '../modules/customer/customer.route';
import { ReservationRoutes } from '../modules/reservation/reservation.routes';
import { guideRoutes } from '../modules/guide/guide.route';
import { productRoutes } from '../modules/product/product.route';
import { orderRoutes } from '../modules/order/order.route';



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
  {
    path: "/customer",
    route: customerRoutes
  },
  {
    path: "/reservation",
    route: ReservationRoutes
  },
  {
    path: "/guide",
    route: guideRoutes
  },
  {
    path: "/product",
    route: productRoutes
  },
  {
    path: "/order",
    route: orderRoutes
  },

];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
