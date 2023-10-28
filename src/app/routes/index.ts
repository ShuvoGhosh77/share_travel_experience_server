import express from 'express';
import { roomRoutes } from '../modules/room/room.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/rooms',
    route: roomRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
