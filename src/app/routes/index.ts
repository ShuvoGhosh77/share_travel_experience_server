import express from 'express';
import { roomRoutes } from '../modules/room/room.routes';
import { customerRoutes } from '../modules/customer/customer.routes';
import { ReservationRoutes } from '../modules/reservation/reservation.routes';



const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/rooms",
    route: roomRoutes
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
    path: '/customer',
    route: customerRoutes
},

];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
