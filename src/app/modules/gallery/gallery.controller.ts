import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { GalleryService } from "./gallery.service";
import pick from "../../../shared/pick";
import { GalleryFilterAbleFileds } from "./gallery.constants";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

    const result = await GalleryService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Add Comment successfully',
        data: result
    });
});


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, GalleryFilterAbleFileds);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await GalleryService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semster data fetched!!',
        meta: result.meta,
        data: result.data,
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await GalleryService.deleteByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicDepartment delete successfully',
      data: result,
    });
  });
export const GalleryController = {
    insertIntoDB,
    getAllFromDB,
    deleteByIdFromDB

};