import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import pick from "../../../shared/pick";

import { RoomService } from "./room.service";
import { RoomFilterAbleFileds } from "./room.constants";



const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.insertIntoDB(req.body);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room created successfully',
      data: result
  });
});


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query, RoomFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await RoomService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semster data fetched!!",
      meta: result.meta,
      data: result.data
  })
})

export const RoomController = {
  insertIntoDB,
  getAllFromDB
  
};