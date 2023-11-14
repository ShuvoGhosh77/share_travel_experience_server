import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";

import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { customerService } from "./customer.service";
import { CustomerFilterAbleFileds } from "./customer.constants";



const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await customerService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'customer created successfully',
        data: result
    });
  });

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, CustomerFilterAbleFileds);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  
    const result = await customerService.getAllFromDB(filters, options);

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
    const result = await customerService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'customer fetched successfully',
        data: result
    });
  });
  
  const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await customerService.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'customer updated successfully',
        data: result
    });
  });
  
  const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await customerService.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'customer successfully Delete',
        data: result
    });
  });

  export const CustomerController = {
    insertIntoDB,
     getAllFromDB,
     getByIdFromDB,
     updateOneInDB,
     deleteByIdFromDB
  };

