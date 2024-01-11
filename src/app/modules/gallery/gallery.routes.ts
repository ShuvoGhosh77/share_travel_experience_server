import express, { NextFunction, Request, Response } from 'express';
import { GalleryController } from './gallery.controller';


const router = express.Router();



router.get('/', GalleryController.getAllFromDB);
router.post('/upload_photo', GalleryController.insertIntoDB);
router.delete('/:id',GalleryController.deleteByIdFromDB);

export const galleryRoutes = router;