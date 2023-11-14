import {Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReservationService } from "./reservation.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { customerData, ...ReservationData} = req.body;
  console.log(customerData,ReservationData)
  const result = await ReservationService.createReservation(customerData, ReservationData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservation created successfully',
    data: result,
  });
});




const getAllFromDB = catchAsync(async (req: Request, res: Response) => {


  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ReservationService.getAllFromDB(options);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Reservation data fetched!!",
      meta: result.meta,
      data: result.data
  })
})

export const ReservationController = {
  insertIntoDB,
  getAllFromDB
  
};