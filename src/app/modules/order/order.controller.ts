import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

  const result = await OrderService.insertIntoDB(req.body);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'customer created successfully',
      data: result
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

  const result = await OrderService.getAllFromDB();

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "customer data fetched!!",
      data: result.data
  })
})

export const OrderController = {
  insertIntoDB,
  getAllFromDB
 
};



