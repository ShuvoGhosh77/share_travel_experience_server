import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { CustomerFilterAbleFileds } from "./customer.constants";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CustomerService } from "./customer.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerService.insertIntoDB(req.body);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer created successfully',
      data: result
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query, CustomerFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CustomerService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Customer data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


export const CustomerController = {
  insertIntoDB,
  getAllFromDB
  
};