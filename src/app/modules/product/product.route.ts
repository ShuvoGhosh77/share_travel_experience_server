import express, { NextFunction, Request, Response } from 'express';
import { ProductController } from './product.controller';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';




const router = express.Router();

router.get('/', ProductController.getAllFromDB);
router.get('/:id', ProductController.getByIdFromDB);
router.post(
    '/create_product',
    FileUploadHelper.upload.single('file'),
    (req:Request,res:Response,next:NextFunction)=>{
     req.body=JSON.parse(req.body.data)
     return ProductController.insertIntoDB(req,res,next)
    }
  );
router.patch(
  '/:id',ProductController.updateOneInDB,

);

router.delete(
  '/:id',
  ProductController.deleteByIdFromDB
);

export const productRoutes = router;