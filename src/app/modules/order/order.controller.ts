import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";
import pick from "../../../shared/pick";
import { OrderFilterAbleFileds } from "./order.constants";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

  const result = await OrderService.insertIntoDB(req.body);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'customer created successfully',
      data: result
  });
});

// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

//   const result = await OrderService.getAllFromDB();

//   sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "customer data fetched!!",
//       data: result.data
//   })
// })
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query, OrderFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await OrderService.getAllFromDB(filters, options);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "customer data fetched!!",
      meta: result.meta,
      data: result.data
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order delete successfully',
    data: result,
  });
});

export const OrderController = {
  insertIntoDB,
  getAllFromDB,
  deleteByIdFromDB
 
};



