import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";

import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ProductFilterAbleFileds } from "./product.constants";
import { ProductService } from "./product.service";




const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  
    const result = await ProductService.insertIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'customer created successfully',
        data: result
    });
  });

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ProductFilterAbleFileds);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  
    const result = await ProductService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "customer data fetched!!",
        meta: result.meta,
        data: result.data
    })
  })

  const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'customer fetched successfully',
        data: result
    });
  });
  
  const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'customer updated successfully',
        data: result
    });
  });
  
  const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'customer successfully Delete',
        data: result
    });
  });

  export const ProductController = {
    insertIntoDB,
     getAllFromDB,
     getByIdFromDB,
     updateOneInDB,
     deleteByIdFromDB
  };

