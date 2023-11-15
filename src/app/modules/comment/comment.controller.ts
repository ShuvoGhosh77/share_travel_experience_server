import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CommentService } from "./comment.service";



const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

    const result = await CommentService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Add Comment successfully',
        data: result
    });
  });
const repliesComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { adminReply } = req.body;
    const result = await CommentService.repliesComment(id,adminReply);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Add Comment successfully',
        data: result
    });
  });
  
  const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CommentService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room fetched successfully',
        data: result
    });
  });

  export const CommentController = {
    insertIntoDB,
    repliesComment,
    getByIdFromDB
  };